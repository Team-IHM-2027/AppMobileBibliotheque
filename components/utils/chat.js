import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config';

/**
 * Hook personnalisé pour compter les messages non lus du chat
 * @param {string} userEmail - Email de l'utilisateur
 * @returns {number} - Nombre de messages non lus
 */
export const useUnreadChatCount = (userEmail) => {
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
                const messages = userData.messages || [];

                // Compter les messages reçus (recue === "R") et non lus (!lu)
                const unreadMessages = messages.filter(message =>
                    message.recue === "R" && !message.lu
                );

                setUnreadCount(unreadMessages.length);
                console.log(`Messages non lus dans le chat: ${unreadMessages.length}`);
            } else {
                setUnreadCount(0);
            }
        }, (error) => {
            console.error('Erreur lors du comptage des messages non lus:', error);
            setUnreadCount(0);
        });

        return () => unsubscribe();
    }, [userEmail]);

    return unreadCount;
};