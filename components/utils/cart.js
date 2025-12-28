// components/utils/cart.js
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config';

/**
 * Hook personnalisé pour compter les réservations actives (panier)
 */
export const useCartCount = (userEmail) => {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (!userEmail) {
            setCartCount(0);
            return;
        }

        const userRef = doc(db, "BiblioUser", userEmail);
        const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();

                // Compter les réservations actives (etat1, etat2, etat3 = 'reserv')
                let activeReservations = 0;
                for (let i = 1; i <= 3; i++) {
                    if (userData[`etat${i}`] === 'reserv') {
                        activeReservations++;
                    }
                }

                setCartCount(activeReservations);
            } else {
                setCartCount(0);
            }
        }, (error) => {
            console.error("Erreur lors du comptage du panier:", error);
            setCartCount(0);
        });

        return () => unsubscribe();
    }, [userEmail]);

    return cartCount;
};