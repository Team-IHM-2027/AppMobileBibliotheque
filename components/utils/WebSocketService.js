// WebSocket Service for Real-time Approval Notifications
// This service handles WebSocket connections for admin approval messages

class WebSocketService {
  constructor() {
    this.ws = null;
    this.url = 'ws://192.168.100.75:8080'; // Update with your backend WebSocket URL
    this.userId = null;
    this.listeners = {
      onApproval: null,
      onMessage: null,
      onError: null,
      onConnected: null,
      onDisconnected: null,
    };
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 3000; // 3 seconds
  }

  /**
   * Set event listener
   */
  on(event, callback) {
    if (this.listeners.hasOwnProperty(`on${event.charAt(0).toUpperCase() + event.slice(1)}`)) {
      this.listeners[`on${event.charAt(0).toUpperCase() + event.slice(1)}`] = callback;
    }
  }

  /**
   * Connect to WebSocket server
   */
  connect(userId) {
    this.userId = userId;

    try {
      console.log(`[WebSocket] Connecting to ${this.url}`);
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('[WebSocket] Connected');
        this.reconnectAttempts = 0;

        // Register user
        this.register(userId);

        // Call connection callback
        if (this.listeners.onConnected) {
          this.listeners.onConnected();
        }
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event.data);
      };

      this.ws.onerror = (error) => {
        console.error('[WebSocket] Error:', error);
        if (this.listeners.onError) {
          this.listeners.onError(error);
        }
      };

      this.ws.onclose = () => {
        console.log('[WebSocket] Disconnected');
        if (this.listeners.onDisconnected) {
          this.listeners.onDisconnected();
        }
        this.attemptReconnect();
      };
    } catch (error) {
      console.error('[WebSocket] Connection failed:', error);
      this.attemptReconnect();
    }
  }

  /**
   * Register user with server
   */
  register(userId) {
    this.send({
      type: 'register',
      role: 'user',
      userId: userId,
    });
  }

  /**
   * Handle incoming messages
   */
  handleMessage(data) {
    try {
      const message = JSON.parse(data);
      console.log('[WebSocket] Received:', message);

      // Global message callback
      if (this.listeners.onMessage) {
        this.listeners.onMessage(message);
      }

      // Handle specific message types
      switch (message.type) {
        case 'reservation_approved':
          this.handleApproval(message);
          break;
        case 'reservation_rejected':
          this.handleRejection(message);
          break;
        case 'book_ready':
          this.handleBookReady(message);
          break;
        default:
          console.log('[WebSocket] Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('[WebSocket] Error parsing message:', error);
    }
  }

  /**
   * Handle reservation approval
   */
  handleApproval(data) {
    console.log('[WebSocket] Reservation approved for book:', data.bookId);
    if (this.listeners.onApproval) {
      this.listeners.onApproval(data);
    }
  }

  /**
   * Handle reservation rejection
   */
  handleRejection(data) {
    console.log('[WebSocket] Reservation rejected for book:', data.bookId);
    // Handle rejection logic
  }

  /**
   * Handle book ready for pickup
   */
  handleBookReady(data) {
    console.log('[WebSocket] Book is ready for pickup:', data.bookId);
    // Handle book ready logic
  }

  /**
   * Send message through WebSocket
   */
  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(message));
        console.log('[WebSocket] Sent:', message);
      } catch (error) {
        console.error('[WebSocket] Error sending message:', error);
      }
    } else {
      console.warn('[WebSocket] Connection not open. Cannot send message.');
    }
  }

  /**
   * Attempt to reconnect
   */
  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(
        `[WebSocket] Attempting reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${this.reconnectDelay}ms`
      );

      setTimeout(() => {
        this.connect(this.userId);
      }, this.reconnectDelay);
    } else {
      console.error('[WebSocket] Max reconnection attempts reached');
    }
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    console.log('[WebSocket] Disconnected');
  }

  /**
   * Check if connected
   */
  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }
}

// Export singleton instance
export default new WebSocketService();
