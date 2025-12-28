import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, View, StyleSheet, Text, Animated } from 'react-native';
import { UserContext } from '../context/UserContext';

const ScreenVueUn = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const { currentUserNewNav } = useContext(UserContext) || {};

  // Animation for fading in text
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    // Fade in the text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setAnimating(false);
      navigation.navigate('VueUn');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
      <View style={styles.container}>
        {/* You can add an animation or a dynamic logo here */}
        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          Chargement...
        </Animated.Text>

        <ActivityIndicator
            animating={animating}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6600',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

export default ScreenVueUn;
