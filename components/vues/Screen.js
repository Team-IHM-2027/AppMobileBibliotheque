// Import React and Component
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config';

const Screen = ({ navigation }) => {
    // State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, () => {
            setLoadingData(true);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            navigation.replace(loadingData === false ? 'NavLogin' : 'NavApp');
        }, 5000);
    }, [loadingData]);

    return (
        <View style={styles.container}>
            <ActivityIndicator animating={animating} size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Chargement en cours...</Text>
        </View>
    );
};

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#000',
    },
});
