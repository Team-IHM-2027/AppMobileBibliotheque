import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function StorageSettings({ navigation }) {
    const [autoDownload, setAutoDownload] = useState(true);
    const [saveOffline, setSaveOffline] = useState(false);
    const [highQualityImages, setHighQualityImages] = useState(false);

    // Mock storage data
    const storageData = {
        total: 2048, // MB
        used: 358, // MB
        books: 120, // MB
        pdfs: 200, // MB
        images: 38 // MB
    };

    // Calculate percentage used
    const percentageUsed = (storageData.used / storageData.total) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#FF8A50" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Données et stockage</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Storage Usage Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Utilisation du stockage</Text>
                    <View style={styles.storageCard}>
                        <View style={styles.storageHeader}>
                            <Text style={styles.storageTitle}>Stockage utilisé</Text>
                            <Text style={styles.storageValue}>
                                {storageData.used} Mo / {storageData.total} Mo
                            </Text>
                        </View>

                        <View style={styles.progressContainer}>
                            <View style={[styles.progressBar, { width: `${percentageUsed}%` }]} />
                        </View>

                        <View style={styles.storageDetails}>
                            <View style={styles.storageItem}>
                                <View style={[styles.colorIndicator, { backgroundColor: '#4361EE' }]} />
                                <Text style={styles.itemName}>Livres</Text>
                                <Text style={styles.itemValue}>{storageData.books} Mo</Text>
                            </View>

                            <View style={styles.storageItem}>
                                <View style={[styles.colorIndicator, { backgroundColor: '#FF5D8F' }]} />
                                <Text style={styles.itemName}>Documents PDF</Text>
                                <Text style={styles.itemValue}>{storageData.pdfs} Mo</Text>
                            </View>

                            <View style={styles.storageItem}>
                                <View style={[styles.colorIndicator, { backgroundColor: '#02C39A' }]} />
                                <Text style={styles.itemName}>Images</Text>
                                <Text style={styles.itemValue}>{storageData.images} Mo</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Download Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Paramètres de téléchargement</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingContent}>
                            <Text style={styles.settingTitle}>Téléchargement automatique</Text>
                            <Text style={styles.settingSubtitle}>Télécharger les livres automatiquement</Text>
                        </View>
                        <Switch
                            value={autoDownload}
                            onValueChange={setAutoDownload}
                            trackColor={{ false: "#D1D1D6", true: "#FF8A5030" }}
                            thumbColor={autoDownload ? "#FF8A50" : "#F4F4F4"}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingContent}>
                            <Text style={styles.settingTitle}>Mode hors-ligne</Text>
                            <Text style={styles.settingSubtitle}>Enregistrer les livres pour un accès hors-ligne</Text>
                        </View>
                        <Switch
                            value={saveOffline}
                            onValueChange={setSaveOffline}
                            trackColor={{ false: "#D1D1D6", true: "#FF8A5030" }}
                            thumbColor={saveOffline ? "#FF8A50" : "#F4F4F4"}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingContent}>
                            <Text style={styles.settingTitle}>Images haute qualité</Text>
                            <Text style={styles.settingSubtitle}>Utiliser des images à haute résolution</Text>
                        </View>
                        <Switch
                            value={highQualityImages}
                            onValueChange={setHighQualityImages}
                            trackColor={{ false: "#D1D1D6", true: "#FF8A5030" }}
                            thumbColor={highQualityImages ? "#FF8A50" : "#F4F4F4"}
                        />
                    </View>
                </View>

                {/* Cache Management */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Gestion du cache</Text>

                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="delete-sweep" size={20} color="#FF3B30" />
                        <Text style={styles.actionButtonText}>Vider le cache</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="storage" size={20} color="#FF8A50" />
                        <Text style={styles.actionButtonText}>Gérer les téléchargements</Text>
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
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    backButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8E8E93',
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 8,
    },
    storageCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        margin: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 3,
    },
    storageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    storageTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    storageValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF8A50',
    },
    progressContainer: {
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        marginBottom: 16,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FF8A50',
        borderRadius: 3,
    },
    storageDetails: {
        marginTop: 8,
    },
    storageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    colorIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    itemName: {
        fontSize: 14,
        color: '#000000',
        flex: 1,
    },
    itemValue: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 1,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500',
    },
    settingSubtitle: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 2,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 1,
    },
    actionButtonText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#000000',
    },
});