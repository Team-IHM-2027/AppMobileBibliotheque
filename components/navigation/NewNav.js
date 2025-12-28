import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavLogin from './NavLogin';
import NavApp from './NavApp';
import { UserContext } from '../context/UserContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../config';
import { doc, onSnapshot } from 'firebase/firestore';
import EmailVerificationScreen from '../composants/EmailVerificationScreen';
import InitialScreen from '../login/InitialScreen';

const Stack = createStackNavigator();

const NewNav = () => {
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
        // Reload user to get fresh emailVerified status
        await user.reload();
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
    return null; // or a loader
  }

  return (
    <UserContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Show different screens based on auth state */}
          {!currentUserNewNav ? (
            // Not signed in - show login flow
            <>
              <Stack.Screen name="InitialScreen" component={InitialScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen 
                name="EmailVerificationScreen" 
                component={EmailVerificationScreen} 
              />
            </>
          ) : !currentUserNewNav.emailVerified ? (
            // Signed in but not verified - register verification + main app
            <>
              <Stack.Screen
                name="EmailVerificationScreen"
                component={EmailVerificationScreen}
                initialParams={{ email: currentUserNewNav.email }}
              />
              <Stack.Screen
                name="MainApp"
                component={NavApp}
              />
            </>
          ) : (
            // Signed in and verified - show main app
            <Stack.Screen name="MainApp" component={NavApp} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default NewNav;