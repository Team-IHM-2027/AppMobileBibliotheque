import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal, Alert, Switch } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth' // Ajouter cet import
import { db, auth } from '../../config'
import { UserContext } from '../context/UserContext'
import { useNavigation } from "@react-navigation/native"
import { useNotificationCount } from '../hooks/useNotificationCount';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

export default function Parametre() {
  const navigation = useNavigation()
  const { currentUserNewNav } = useContext(UserContext)
  const [datUserParams, setDatUserParams] = useState('')
  const [loading, setLoading] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('Français') // Pour l'internationalisation
  const [empruntsCount, setEmpruntsCount] = useState(0);
  const unreadNotifications = useNotificationCount(currentUserNewNav?.email);

  const [storageInfo, setStorageInfo] = useState({
    total: 0,
    used: 0,
    books: 0,
    pdfs: 0,
    images: 0
  });

  const t = (key) => {
    const translations = {
      'permission_denied': 'Permission refusée',
      'permission_photos_needed': 'Nous avons besoin de votre permission pour accéder à vos photos',
      'success': 'Succès',
      'profile_updated': 'Photo de profil mise à jour avec succès',
      'error': 'Erreur',
      'profile_update_failed': 'Impossible de mettre à jour la photo de profil',
      'login_required': 'Vous devez être connecté pour modifier votre photo de profil',
      'image_selection_failed': 'Impossible de sélectionner l\'image',
      'logout': 'Déconnexion',
      'logout_confirm': 'Voulez-vous vraiment vous déconnecter ?',
      'cancel': 'Annuler',
      'confirm': 'Confirmer'
    };

    return translations[key] || key;
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('permission_denied'), t('permission_photos_needed'));
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets[0] && result.assets[0].uri) {
        if (currentUserNewNav?.email) {
          try {
            await updateDoc(doc(db, "BiblioUser", currentUserNewNav.email), {
              imageUri: result.assets[0].uri
            });
            Alert.alert(t('success'), t('profile_updated'));
          } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image:", error);
            Alert.alert(t('error'), t('profile_update_failed'));
          }
        } else {
          Alert.alert(t('error'), t('login_required'));
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      Alert.alert(t('error'), t('image_selection_failed'));
    }
  };

  useEffect(() => {
    if (!currentUserNewNav?.email) {
      console.log("Pas d'email utilisateur disponible");
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onSnapshot(
          doc(db, 'BiblioUser', currentUserNewNav.email),
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setDatUserParams(userData);

              // Calculer le nombre d'emprunts actifs
              let empruntsCount = 0;
              for (let i = 1; i <= 3; i++) {
                if (userData[`etat${i}`] === 'emprunt') {
                  empruntsCount++;
                }
              }

              console.log('Nombre d\'emprunts calculé:', empruntsCount);
              setEmpruntsCount(empruntsCount); // Mettre à jour le state

            } else {
              console.log("Aucune donnée utilisateur trouvée");
              setEmpruntsCount(0);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Erreur lors de la récupération des données:", error);
            setLoading(false);
          }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Erreur lors de la configuration:", error);
      setLoading(false);
    }
  }, [currentUserNewNav?.email]);

  useEffect(() => {
    loadDarkModePreference();
  }, []);

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  useEffect(() => {
    calculateRealStorageData();
  }, [datUserParams]);

  const calculateRealStorageData = async () => {
    try {
      if (!datUserParams) return;

      // Calculer les données réelles basées sur l'utilisateur
      const reservations = [
        datUserParams.etat1,
        datUserParams.etat2,
        datUserParams.etat3
      ].filter(etat => etat === 'reserv').length;

      const historySize = (datUserParams.historique || []).length;
      const notificationsSize = (datUserParams.notifications || []).length;

      // Estimation approximative (en Ko)
      const estimatedUsage = {
        books: reservations * 50, // 50Ko par réservation
        notifications: notificationsSize * 5, // 5Ko par notification
        history: historySize * 10, // 10Ko par élément d'historique
        userData: 20 // 20Ko pour les données utilisateur
      };

      const totalUsed = Object.values(estimatedUsage).reduce((a, b) => a + b, 0);

      setStorageInfo({
        total: 1024, // 1MB total
        used: totalUsed,
        books: estimatedUsage.books,
        notifications: estimatedUsage.notifications,
        history: estimatedUsage.history,
        userData: estimatedUsage.userData
      });
    } catch (error) {
      console.error('Erreur lors du calcul du stockage:', error);
    }
  };

  const loadLanguagePreference = async () => {
    try {
      const languageValue = await AsyncStorage.getItem('language');
      if (languageValue !== null) {
        setLanguage(languageValue);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la langue:', error);
    }
  };


  const loadDarkModePreference = async () => {
    try {
      const darkModeValue = await AsyncStorage.getItem('darkMode');
      if (darkModeValue !== null) {
        setIsDarkMode(JSON.parse(darkModeValue));
      }
    } catch (error) {
      console.error('Erreur lors du chargement du mode sombre:', error);
    }
  };

  const toggleDarkMode = async (value) => {
    try {
      setIsDarkMode(value);
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
      // Pour une implémentation complète, il faudrait un Context global
      Alert.alert('Information', 'Le mode sombre sera appliqué au prochain redémarrage de l\'application.');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du mode sombre:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
        t('logout'),
        t('logout_confirm'),
        [
          { text: t('cancel'), style: 'cancel' },
          {
            text: t('confirm'),
            style: 'destructive',
            onPress: async () => {
              try {
                // Déconnexion Firebase
                await signOut(auth);
                console.log('Utilisateur déconnecté avec succès');

                // La navigation sera gérée automatiquement par le contexte NavApp
                // qui écoute les changements d'état d'authentification
              } catch (error) {
                console.error('Erreur lors de la déconnexion:', error);
                Alert.alert('Erreur', 'Impossible de se déconnecter. Veuillez réessayer.');
              }
            }
          }
        ]
    );
  };

  // Redirection vers la modification des informations personnelles
  const goToEditProfile = () => {
    navigation.navigate('EditProfile', {
      imageM: datUserParams?.imageUri || '',
      nameM: datUserParams?.name || '',
      emailM: datUserParams?.email || '',
      telM: datUserParams?.tel || '',
      departM: datUserParams?.departement || '',
      niveauM: datUserParams?.niveau || ''
    });
  };

  // Redirection vers l'historique des consultations
  const goToHistory = () => {
    navigation.navigate('Historique', { datUser: datUserParams });
  };

  // Redirection vers les emprunts
  const goToBorrowings = () => {
    navigation.navigate('Emprunt', { datUser: datUserParams });
  };

  // Redirection vers l'aide
  const goToHelp = () => {
    navigation.navigate('Aide');
  };

  // Redirection vers les notifications
  const goToNotifications = () => {
    navigation.navigate('Notifications');
  };

  // Redirection vers les paramètres de langue
  const goToLanguageSettings = () => {
    navigation.navigate('LanguageSettings', {
      currentLanguage: language,
      onLanguageChange: (newLanguage) => {
        setLanguage(newLanguage);
        AsyncStorage.setItem('language', newLanguage);
      }
    });
  };

  // Redirection vers l'invitation d'étudiants
  const goToInviteStudent = () => {
    navigation.navigate('InviteStudent');
  };

  // Redirection vers les paramètres de stockage
  const goToStorage = () => {
    navigation.navigate('StorageSettings', {
      storageData: storageInfo,
      userEmail: currentUserNewNav?.email
    });
  };

  // Redirection vers les paramètres de sécurité
  const goToSecurity = () => {
    navigation.navigate('SecuritySettings');
  };

  // Pour changer le mot de passe
  const goToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF8A50" />
        </View>
    );
  }

  const renderSettingItem = ({ icon, iconColor, title, subtitle, action, badge, toggle, value }) => (
      <TouchableOpacity
          style={styles.settingItem}
          onPress={action}
          disabled={toggle}
      >
        <View style={[styles.settingIconContainer, { backgroundColor: iconColor + '20' }]}>
          {icon}
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
        {badge && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
        )}
        {toggle && (
            <Switch
                value={value}
                onValueChange={action}
                trackColor={{ false: "#D1D1D6", true: "#FF8A5030" }}
                thumbColor={value ? "#FF8A50" : "#F4F4F4"}
                ios_backgroundColor="#D1D1D6"
            />
        )}
        {!toggle && !badge && (
            <MaterialIcons name="arrow-forward-ios" size={16} color="#A1A1A1" />
        )}
      </TouchableOpacity>
  );

  return (
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.header}>
          <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FF8A50" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>Paramètres</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* Profile Card */}
          <TouchableOpacity onPress={goToEditProfile} style={styles.profileCard}>
            <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
              {datUserParams?.imageUri ? (
                  <Image style={styles.profileImage} source={{ uri: datUserParams.imageUri }} />
              ) : (
                  <Image style={styles.profileImage} source={require('../../assets/userIc2.png')} />
              )}
              <View style={styles.cameraButton}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, isDarkMode && styles.darkText]}>
                {datUserParams?.name || "Sans nom"}
              </Text>
              <Text style={styles.profileEmail}>{datUserParams?.email || 'Email non défini'}</Text>
              <Text style={styles.profileDepartment}>
                {datUserParams?.departement ? `${datUserParams.departement} • Niveau ${datUserParams?.niveau || 'N/A'}` : 'Département non défini'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Compte</Text>

            {renderSettingItem({
              icon: <MaterialIcons name="person-outline" size={20} color="#FF8A50" />,
              iconColor: "#FF8A50",
              title: "Informations personnelles",
              action: goToEditProfile
            })}

            {renderSettingItem({
              icon: <MaterialIcons name="lock-outline" size={20} color="#5E60CE" />,
              iconColor: "#5E60CE",
              title: "Modifier le mot de passe",
              action: goToChangePassword
            })}

            {renderSettingItem({
              icon: <MaterialCommunityIcons name="bookshelf" size={20} color="#4361EE" />,
              iconColor: "#4361EE",
              title: "Mes emprunts",
              badge: empruntsCount > 0 ? empruntsCount.toString() : null, // Utiliser le state calculé
              action: goToBorrowings
            })}

            {renderSettingItem({
              icon: <MaterialIcons name="history" size={20} color="#3F8EFC" />,
              iconColor: "#3F8EFC",
              title: "Historique des consultations",
              subtitle: datUserParams?.historique?.length > 0 ? `${datUserParams.historique.length} livre(s) consulté(s)` : "Aucun livre consulté",
              action: goToHistory
            })}
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Préférences</Text>

            {renderSettingItem({
              icon: <Ionicons name="notifications-outline" size={20} color="#FF5D8F" />,
              iconColor: "#FF5D8F",
              title: "Notifications",
              badge: unreadNotifications > 0 ? unreadNotifications.toString() : null,
              action: goToNotifications
            })}

            {renderSettingItem({
              icon: <Ionicons name="globe-outline" size={20} color="#02c39a" />,
              iconColor: "#02c39a",
              title: "Langue",
              subtitle: language,
              action: goToLanguageSettings
            })}

            {renderSettingItem({
              icon: <Ionicons name="moon-outline" size={20} color="#6930c3" />,
              iconColor: "#6930c3",
              title: "Mode sombre",
              toggle: true,
              value: isDarkMode,
              action: () => setIsDarkMode(!isDarkMode)
            })}

            {renderSettingItem({
              icon: <MaterialIcons name="storage" size={20} color="#2ec4b6" />,
              iconColor: "#2ec4b6",
              title: "Données et stockage",
              action: goToStorage
            })}
          </View>

          {/* Sharing Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Partage</Text>

            {renderSettingItem({
              icon: <Feather name="user-plus" size={20} color="#fb8500" />,
              iconColor: "#fb8500",
              title: "Inviter un étudiant",
              action: goToInviteStudent
            })}
          </View>

          {/* Help Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Aide et sécurité</Text>

            {renderSettingItem({
              icon: <MaterialIcons name="help-outline" size={20} color="#3a86ff" />,
              iconColor: "#3a86ff",
              title: "Aide et support",
              action: goToHelp
            })}

            {renderSettingItem({
              icon: <MaterialIcons name="security" size={20} color="#38b000" />,
              iconColor: "#38b000",
              title: "Confidentialité et sécurité",
              action: goToSecurity
            })}
          </View>

          {/* Log Out */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  darkContainer: {
    backgroundColor: "#1A1A1A",
  },
  darkText: {
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    position: 'relative',
    overflow: 'hidden',
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF8A50',
    borderRadius: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  profileDepartment: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#666666',
    fontSize: 12,
    fontWeight: '500',
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 1,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  badgeContainer: {
    backgroundColor: '#FF8A50',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  versionText: {
    color: '#8E8E93',
    fontSize: 14,
  },
});