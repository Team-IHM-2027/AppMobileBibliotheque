import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config';

/**
 * Hook personnalisé pour compter les notifications non lues
 * @param {string} userEmail - Email de l'utilisateur
 * @returns {number} - Nombre de notifications non lues
 */
export const useNotificationCount = (userEmail) => {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!userEmail) {
            setUnreadCount(0);
            return;
        }

        const userRef = doc(db, 'BiblioUser', userEmail);
        const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const notifications = userData.notifications || [];

                // Compter les notifications non lues
                const unreadNotifications = notifications.filter(notification => !notification.read);
                setUnreadCount(unreadNotifications.length);

                console.log(`Notifications non lues: ${unreadNotifications.length} sur ${notifications.length}`);
            } else {
                setUnreadCount(0);
            }
        }, (error) => {
            console.error('Erreur lors du comptage des notifications:', error);
            setUnreadCount(0);
        });

        return () => unsubscribe();
    }, [userEmail]);

    return unreadCount;
};