import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../../config';

export const FirebaseContext = createContext({
  isFirebaseReady: false,
  db: null,
});

export function FirebaseProvider({ children }) {
  const [isFirebaseReady, setIsFirebaseReady] = useState(true);

  return (
    <FirebaseContext.Provider value={{ isFirebaseReady, db }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase doit être utilisé dans un FirebaseProvider');
  }
  return context;
}
