import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen from '../vues/Screen';
import NavLogin from './NavLogin';
import NavApp from './NavApp';
import { UserContext } from '../context/UserContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../config';
import { doc, onSnapshot } from 'firebase/firestore';

const Stack = createStackNavigator();

const NewNav = () => {
  const [donnees, setDonnees] = useState('');
  const [emailHigh, setEmailHigh] = useState('');
  const [docRecent, setDocRecent] = useState([]);
  const [currentUserNewNav, setCurrentUserNewNav] = useState(null);
  const [datUserTest, setDatUserTest] = useState(false);
  const [datUser, setDatUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('NewNav onAuthStateChanged fired, user:', user);
      if (user) {
        setCurrentUserNewNav(user);
        const userDocRef = doc(db, 'BiblioUser', user.email);
        onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setDocRecent(data.docRecent || []);
            setDatUser(data);
          }
          setIsInitialized(true);
        });
      } else {
        setCurrentUserNewNav(null);
        setDocRecent([]);
        setDatUser(null);
        setIsInitialized(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue = useMemo(() => ({
    emailHigh,
    setEmailHigh,
    docRecent,
    setDocRecent,
    currentUserNewNav,
    setCurrentUserNewNav,
    datUserTest,
    setDatUserTest,
    datUser,
    setDatUser
  }), [emailHigh, docRecent, currentUserNewNav, datUserTest, datUser]);

  if (!isInitialized) {
    return null; // ou un composant de chargement
  }

  return (
    <UserContext.Provider value={contextValue}>
      <NavigationContainer>
        {!currentUserNewNav ? <NavLogin /> : <NavApp />}
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default NewNav;