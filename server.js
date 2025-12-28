// Standalone WebSocket + HTTP Server for BiblioApp
// Run: node server.js

const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const admin = require('firebase-admin');

// Try to initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, 'serviceAccount.json');
if (fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    console.log('✅ Firebase Admin initialized using serviceAccount.json');
  } catch (err) {
    console.error('❌ Failed to initialize Firebase Admin with serviceAccount.json:', err.message);
    admin.initializeApp();
  }
} else {
  // Fall back to default credentials (if running in environment that provides them)
  try {
    admin.initializeApp();
    console.log('⚠️  Firebase Admin initialized with default credentials (no serviceAccount.json found)');
  } catch (err) {
    console.warn('⚠️  Firebase Admin not initialized (serviceAccount.json missing, and no default credentials). Firestore calls will fail until you provide credentials.');
  }
}

const db = admin.firestore ? admin.firestore() : null;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Map to track connected users: userId -> ws
const connectedUsers = new Map();

console.log('Initializing BiblioApp standalone server...');

wss.on('connection', (ws, req) => {
  const remote = req.socket.remoteAddress;
  console.log(`📡 New WS connection from ${remote}`);

  ws.on('message', async (message) => {
    let msg = null;
    try {
      msg = JSON.parse(message);
    } catch (err) {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
      return;
    }

    const type = msg.type;
    switch (type) {
      case 'register':
        if (msg.userId) {
          connectedUsers.set(msg.userId, ws);
          console.log(`✅ Registered user socket: ${msg.userId} (connected: ${connectedUsers.size})`);
          ws.send(JSON.stringify({ type: 'registered', userId: msg.userId, message: 'registered' }));
        } else {
          ws.send(JSON.stringify({ type: 'error', message: 'register requires userId' }));
        }
        break;

      case 'reserve':
        if (!db) {
          ws.send(JSON.stringify({ type: 'error', message: 'Firestore not initialized on server' }));
          break;
        }
        try {
          const reservationRef = db.collection('reservations').doc();
          await reservationRef.set({
            userId: msg.userId || null,
            bookId: msg.bookId || null,
            status: 'pending',
            createdAt: admin.firestore.Timestamp.now()
          });
          ws.send(JSON.stringify({ type: 'reservation_pending', reservationId: reservationRef.id, bookId: msg.bookId }));
          console.log(`📚 Reservation created ${reservationRef.id} for ${msg.userId}`);
        } catch (err) {
          console.error('❌ Error creating reservation:', err.message);
          ws.send(JSON.stringify({ type: 'error', message: 'Failed to create reservation' }));
        }
        break;

      case 'admin_approve':
        // admin can send approval via WS as well
        handleApprovalMessage(msg).catch(err => console.error('Error handling admin_approve via WS:', err));
        break;

      default:
        ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
    }
  });

  ws.on('close', () => {
    // remove from connectedUsers if present
    for (const [userId, socket] of connectedUsers.entries()) {
      if (socket === ws) {
        connectedUsers.delete(userId);
        console.log(`🔌 User ${userId} disconnected (connected: ${connectedUsers.size})`);
        break;
      }
    }
  });

  ws.on('error', (err) => {
    console.error('WS error:', err.message);
  });
});

// Shared approval handler used by HTTP and WS
async function handleApprovalMessage(msg) {
  const { reservationId, userId, bookId, bookTitle, approvedBy } = msg;
  if (!reservationId || !userId || !bookId) {
    console.warn('Approval message missing fields');
    return { success: false, error: 'Missing fields' };
  }

  if (!db) {
    console.warn('Firestore not available: cannot update reservation');
    return { success: false, error: 'Firestore not initialized' };
  }

  try {
    await db.collection('reservations').doc(reservationId).update({
      status: 'approved',
      approvedAt: admin.firestore.Timestamp.now(),
      approvedBy: approvedBy || 'admin'
    });

    const socket = connectedUsers.get(userId);
    const payload = {
      type: 'reservation_approved',
      reservationId,
      bookId,
      bookTitle: bookTitle || null,
      message: `Your reservation for "${bookTitle || bookId}" has been approved.`,
      approvedAt: new Date().toISOString()
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(payload));
      console.log(`🚀 Sent approval to ${userId}`);
      return { success: true, notified: true };
    }

    console.log(`ℹ️  User ${userId} not connected; approval stored in Firestore`);
    return { success: true, notified: false };
  } catch (err) {
    console.error('❌ Error approving reservation:', err.message);
    return { success: false, error: err.message };
  }
}

// HTTP endpoint to approve reservation (admin)
app.post('/api/admin/approve', async (req, res) => {
  try {
    const result = await handleApprovalMessage(req.body);
    if (result.success) {
      res.json({ success: true, notified: result.notified });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  } catch (err) {
    console.error('❌ /api/admin/approve error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', connectedUsers: connectedUsers.size, timestamp: new Date().toISOString() });
});

app.get('/api/users/connected', (req, res) => {
  res.json({ count: connectedUsers.size, users: Array.from(connectedUsers.keys()) });
});

// Start server
server.listen(PORT, () => {
  console.log(`\n=== BiblioApp Standalone Server ===\nWS: ws://localhost:${PORT}\nHTTP: http://localhost:${PORT}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => process.exit(0));
});

module.exports = server;