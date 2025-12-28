import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function LanguageSettings({ navigation }) {
    const [selectedLanguage, setSelectedLanguage] = useState('Français');

    const languages = [
        { id: '1', name: 'Français', code: 'fr' },
        { id: '2', name: 'English', code: 'en' },
        { id: '3', name: 'Español', code: 'es' },
        { id: '4', name: 'العربية', code: 'ar' },
        { id: '5', name: 'Deutsch', code: 'de' }
    ];

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language.name);
        // Here you would typically update the app's language context or settings
        // For example: updateLanguage(language.code);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#FF8A50" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Langue</Text>
                <View style={{ width: 24 }} />
            </View>

            <Text style={styles.subtitle}>Sélectionnez votre langue préférée</Text>

            <FlatList
                data={languages}
                keyExtractor={(item) => item.id}
                style={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.languageItem}
                        onPress={() => handleLanguageSelect(item)}
                    >
                        <Text style={styles.languageName}>{item.name}</Text>
                        {selectedLanguage === item.name && (
                            <Ionicons name="checkmark-circle" size={24} color="#FF8A50" />
                        )}
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    backButton: {
        padding: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 24,
    },
    list: {
        flex: 1,
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
    },
    languageName: {
        fontSize: 16,
        color: '#000000',
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
    },
});