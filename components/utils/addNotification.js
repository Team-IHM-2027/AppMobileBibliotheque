import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '../../config';

/**
 * Ajoute une notification au tableau notifications de l'utilisateur
 * @param {string} userEmail - Email de l'utilisateur
 * @param {string} type - Type de notification (reservation, emprunt, etc.)
 * @param {string} title - Titre de la notification
 * @param {string} message - Message de la notification
 */
export const addNotification = async (userEmail, type, title, message) => {
    try {
        const userRef = doc(db, 'BiblioUser', userEmail);

        const notification = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9), // ID unique
            type: type,
            title: title,
            message: message,
            date: Timestamp.now(),
            read: false
        };

        await updateDoc(userRef, {
            notifications: arrayUnion(notification)
        });

        console.log(`Notification ajoutée pour ${userEmail}: ${title}`);
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la notification:', error);
    }
};

// Types de notifications couramment utilisés
export const NOTIFICATION_TYPES = {
    RESERVATION: 'reservation',
    EMPRUNT: 'emprunt',
    RETOUR: 'retour',
    ANNULATION: 'annulation',
    RAPPEL: 'rappel',
    NOUVEAU_LIVRE: 'nouveau_livre',
    MESSAGE: 'message'
};