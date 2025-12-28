import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Aide({ navigation }) {
    const helpSections = [
        {
            title: "Comment réserver un livre ?",
            content: "1. Recherchez le livre dans la bibliothèque\n2. Cliquez sur 'Réserver'\n3. Votre réservation sera confirmée\n4. Venez récupérer le livre à la bibliothèque"
        },
        {
            title: "Comment voir mes emprunts ?",
            content: "Allez dans Paramètres > Mes emprunts pour voir tous vos livres empruntés et leur date de retour."
        },
        {
            title: "Que faire si un livre est indisponible ?",
            content: "Si un livre est indisponible, vous pouvez :\n- Vérifier s'il y a des livres similaires\n- Demander à la bibliothécaire quand il sera disponible\n- Mettre une alerte (fonction à venir)"
        },
        {
            title: "Comment contacter la bibliothèque ?",
            content: "Utilisez la fonction Chat pour envoyer un message directement à la bibliothécaire."
        },
        {
            title: "Durée d'emprunt",
            content: "La durée standard d'emprunt est de 2 semaines. Vous pouvez demander une prolongation via le chat."
        }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FF8A50" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Aide et support</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.subtitle}>
                    Trouvez des réponses à vos questions les plus fréquentes
                </Text>

                {helpSections.map((section, index) => (
                    <View key={index} style={styles.helpSection}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <Text style={styles.sectionContent}>{section.content}</Text>
                    </View>
                ))}

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Besoin d'aide supplémentaire ?</Text>
                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={() => navigation.navigate('Email')}
                    >
                        <Ionicons name="chatbubble-outline" size={20} color="#fff" />
                        <Text style={styles.chatButtonText}>Contacter la bibliothèque</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    backButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 24,
        textAlign: 'center',
    },
    helpSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
    },
    sectionContent: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
    contactSection: {
        backgroundColor: '#FF8A50',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',
    },
    chatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    chatButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});