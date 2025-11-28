import React, { useContext, useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  Dimensions, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Image 
} from 'react-native';

// Import assets with consistent naming
import imgElec from '../../assets/biblio/elec.jpg';
import imgInfo from '../../assets/biblio/info.jpg';
import imgMath from '../../assets/biblio/math.jpg';
import imgMeca from '../../assets/biblio/meca.jpg';
import imgPhysik from '../../assets/biblio/physik.jpg';
import imgTelcom from '../../assets/biblio/telcom.jpg';
import imgMemGI from '../../assets/memoire1.jpg';
import imgMemGC from '../../assets/memoire2.jpg';
import imgMemGInd from '../../assets/memoire3.jpg';
import imgMemGEle from '../../assets/memoire4.jpg';
import imgMemGM from '../../assets/memoire5.jpg';
import imgMemGTel from '../../assets/memoire6.jpg';

// Firebase imports
import { db } from '../../config';
import { collection, onSnapshot, orderBy, query, getDocs, doc, getDoc } from 'firebase/firestore';

// Component imports
import BigRect from '../composants/BigRect';
import Cercle from '../composants/Cercle';
import PubCar from '../composants/PubCar';
import PubRect from '../composants/PubRect';
import SmallRect from '../composants/SmallRect';
import { UserContext } from '../context/UserContext';
import { API_URL } from '../../apiConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {MaterialCommunityIcons} from "@expo/vector-icons";

// Constants
const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

// Color palette for consistency
const COLORS = {
  primary: '#FF6600',
  secondary: '#2c3e50',
  accent: '#e74c3c',
  background: '#f9f9f9',
  cardBackground: '#ffffff',
  text: {
    primary: '#2c3e50',
    secondary: '#7f8c8d',
    light: '#95a5a6',
    white: '#ffffff'
  },
  success: '#27ae60',
  info: '#F16522',
  warning: '#f39c12',
  error: '#e74c3c',
  divider: 'rgba(128, 128, 128, 0.3)'
};

const VueUn = (props) => {
  // Context and state
  const { currentUserNewNav, datUser, datUserTest } = useContext(UserContext) || {};
  const [dataWeb, setDataWeb] = useState([]);
  const [loaderWeb, setLoaderWeb] = useState(true);
  const [activeTab, setActiveTab] = useState('departement');
  const [popularBooks, setPopularBooks] = useState([]);
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [memoireData, setMemoireData] = useState([]);
  const [memoireLoader, setMemoireLoader] = useState(true);

  // Network helper function
  const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  // Fetch user recommendations
  const fetchUserRecommendations = async (email) => {
    if (!email) return;
  
    try {
      setLoadingRecommendations(true);
      const response = await fetch(`${API_URL}/recommendations/similar-users/${encodeURIComponent(email)}`);
      const data = await response.json();
    
      if (data.recommendations) {
        setUserRecommendations(data.recommendations);
        setSimilarUsers(data.similar_users || []);
      } else {
        console.log('Pas de recommendations dans la réponse');
        setUserRecommendations([]);
        setSimilarUsers([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des recommandations:', error);
      setUserRecommendations([]);
      setSimilarUsers([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Fetch popular books
  const fetchPopularBooks = async () => {
    try {
      const collections = ['BiblioBooks'];
      let allBooks = [];

      for (const collectionName of collections) {
        const booksRef = collection(db, collectionName);
        const querySnapshot = await getDocs(booksRef);
        
        querySnapshot.forEach((doc) => {
          const bookData = doc.data();
          if (bookData && bookData.name && bookData.commentaire) {
            // Calculate average rating
            const ratings = bookData.commentaire
              .map(c => Number(c.note))
              .filter(note => !isNaN(note));
            
            const averageRating = ratings.length > 0
              ? ratings.reduce((a, b) => a + b, 0) / ratings.length
              : 0;

            allBooks.push({
              id: doc.id,
              title: bookData.name,
              category: bookData.cathegorie,
              image: bookData.image,
              description: bookData.desc,
              exemplaire: bookData.exemplaire,
              averageRating,
              numberOfRatings: ratings.length
            });
          }
        });
      }

      // Sort by average rating and number of ratings
      const popular = allBooks
        .sort((a, b) => {
          if (b.averageRating === a.averageRating) {
            return b.numberOfRatings - a.numberOfRatings;
          }
          return b.averageRating - a.averageRating;
        })
        .slice(0, 10);

      setPopularBooks(popular);
    } catch (error) {
      console.error('Erreur lors de la récupération des livres populaires:', error);
      setPopularBooks([]);
    }
  };

  // Fetch similar users recommendations
  const fetchSimilarUsersRecommendations = async (email) => {
    if (!email) return;

    try {
      setLoadingRecommendations(true);
      
      // Get all users from the database
      const usersRef = collection(db, "BiblioUser");
      const usersSnapshot = await getDocs(usersRef);
      
      // Get current user's history
      const userRef = doc(db, "BiblioUser", email);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) return;

      const userData = userDoc.data();
      const userHistory = userData.historique || [];
      const userCategories = new Set(userHistory.map(item => item.cathegorieDoc));
      const userBooks = new Set(userHistory.map(item => item.nameDoc));

      // Structure to store similarity scores
      let allSimilarUsers = [];
      let bookRecommendations = new Map();

      // Analyze each user in the database
      usersSnapshot.forEach(doc => {
        if (doc.id !== email) { // Exclude current user
          const otherUserData = doc.data();
          const otherUserHistory = otherUserData.historique || [];
          const otherUserCategories = new Set(otherUserHistory.map(item => item.cathegorieDoc));
          
          // Calculate similarity factors
          const commonCategories = [...userCategories].filter(cat => otherUserCategories.has(cat));
          const categorySimScore = commonCategories.length / Math.max(userCategories.size, otherUserCategories.size);
          
          // Calculate similarity based on common books
          const commonBooks = otherUserHistory.filter(item => userBooks.has(item.nameDoc)).length;
          const bookSimScore = commonBooks / Math.max(userHistory.length, otherUserHistory.length);
          
          // Overall similarity score
          const similarityScore = (categorySimScore * 0.6) + (bookSimScore * 0.4);

          if (similarityScore > 0.2) { // Similarity threshold
            allSimilarUsers.push({
              email: doc.id,
              similarity: similarityScore,
              history: otherUserHistory
            });

            // Collect recommendations from this user
            otherUserHistory.forEach(item => {
              if (!userBooks.has(item.nameDoc)) {
                const key = item.nameDoc;
                const current = bookRecommendations.get(key) || {
                  count: 0,
                  similaritySum: 0,
                  title: item.nameDoc,
                  category: item.cathegorieDoc,
                  image: item.image,
                  description: item.desc,
                  type: item.type
                };
                current.count++;
                current.similaritySum += similarityScore;
                bookRecommendations.set(key, current);
              }
            });
          }
        }
      });

      // Sort similar users by similarity score
      allSimilarUsers = allSimilarUsers
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5); // Keep top 5 similar users

      // Calculate final recommendation scores
      const recommendations = Array.from(bookRecommendations.values())
        .map(book => ({
          ...book,
          similarity_score: (book.similaritySum / book.count) * 100 // Weighted average score
        }))
        .sort((a, b) => b.similarity_score - a.similarity_score)
        .slice(0, 10); // Keep top 10 recommendations

      setSimilarUsers(allSimilarUsers);
      setUserRecommendations(recommendations);

    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
      setSimilarUsers([]);
      setUserRecommendations([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const fetchMemoires = () => {
    try {
      const memoireRef = collection(db, 'Memoire');
      const q = query(memoireRef, orderBy('name', 'asc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            ...data,
            isMémoire: true
          });
        });
        console.log(`${items.length} mémoires chargés`);
        setMemoireData(items);
        setMemoireLoader(false);
      }, (error) => {
        console.error("Erreur lors de la récupération des mémoires:", error);
        setMemoireLoader(false);
      });

      return unsubscribe; // Retourner directement la fonction
    } catch (error) {
      console.error("Erreur lors de l'initialisation du listener mémoires:", error);
      setMemoireLoader(false);
      return () => {}; // Fonction vide en cas d'erreur
    }
  };

  // Initial data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingRecommendations(true);
        await Promise.all([
          fetchPopularBooks(),
          currentUserNewNav?.email ? fetchSimilarUsersRecommendations(currentUserNewNav.email) : Promise.resolve()
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    loadData();
  }, [currentUserNewNav?.email]);

  // Load web data
  useEffect(() => {
    if (!currentUserNewNav?.email) {false
      setLoaderWeb();
      setMemoireLoader(false);
      return;
    }

    try {
      // Charger les livres
      const qLivres = query(collection(db, 'BiblioWeb'), orderBy('name', 'asc'));
      const unsubscribeLivres = onSnapshot(qLivres, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setDataWeb(items);
        setLoaderWeb(false);
      }, (error) => {
        console.error("Erreur lors de la récupération des données web:", error);
        setLoaderWeb(false);
      });

      // Charger les mémoires
      const unsubscribeMemoires = fetchMemoires();

      return () => {
        unsubscribeLivres();
        if (unsubscribeMemoires) unsubscribeMemoires();
      };
    } catch (error) {
      console.error("Erreur lors de l'initialisation des listeners:", error);
      setLoaderWeb(false);
      setMemoireLoader(false);
    }
  }, [currentUserNewNav?.email]);

  const handleMemoireClick = (categorieMemoire) => {
    // Filtrer les mémoires par catégorie
    const memoiresFiltres = memoireData.filter(memoire =>
        memoire.departement === categorieMemoire ||
        memoire.cathegorie === categorieMemoire
    );

    props.navigation.navigate('Cathegorie', {
      cathegorie: categorieMemoire,
      datUser: datUser,
      isMemoire: true,
      memoireData: memoiresFiltres
    });
  };


  // Render recommendation section
  const renderRecommendationSection = () => {
    if (loadingRecommendations) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Chargement des recommandations...</Text>
        </View>
      );
    }

    return (
      <View style={styles.recommendationContainer}>
        {/* Personalized recommendations section */}
        {userRecommendations.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Recommandé pour vous</Text>
            <Text style={styles.sectionSubtitle}>
              Basé sur {similarUsers.length} utilisateurs similaires
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {userRecommendations.map((book, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.bookCard}
                  onPress={() => props.navigation.navigate('Produit', {
                    name: book.title,
                    desc: book.description || '',
                    image: book.image,
                    cathegorie: book.category,
                    type: book.type || '',
                    salle: book.salle || '',
                    etagere: book.etagere || '',
                    exemplaire: book.exemplaire || 0,
                    nomBD: 'BiblioInformatique',
                    commentaire: book.commentaire || []
                  })}
                >
                  <Image
                    source={{ uri: book.image }}
                    style={styles.bookImage}
                    resizeMode="cover"
                  />
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle} numberOfLines={2}>
                      {book.title}
                    </Text>
                    <Text style={styles.bookCategory}>
                      {book.category} • {book.type || 'Non spécifié'}
                    </Text>
                    <View style={styles.scoreContainer}>
                      <Text style={styles.similarityScore}>
                        {Math.round(book.similarity_score || 40)}% pertinent
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Popular books section */}
        {popularBooks.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Populaire dans la bibliothèque</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popularBooks.map((book, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.bookCard}
                  onPress={() => props.navigation.navigate('Produit', {
                    name: book.title,
                    desc: book.description || '',
                    image: book.image,
                    cathegorie: book.category,
                    type: book.type || '',
                    salle: book.salle || '',
                    etagere: book.etagere || '',
                    exemplaire: book.exemplaire || 0,
                    nomBD: 'BiblioInformatique',
                    commentaire: book.commentaire || []
                  })}
                >
                  <Image
                    source={{ uri: book.image }}
                    style={styles.bookImage}
                    resizeMode="cover"
                  />
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle} numberOfLines={2}>
                      {book.title}
                    </Text>
                    <Text style={styles.bookCategory}>
                      {book.category} • {book.type || 'Non spécifié'}
                    </Text>
                    <View style={styles.scoreContainer}>
                      <Text style={styles.consultationScore}>
                        {book.numberOfRatings || 0} consultations
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  // Redirect to login if no user
  if (!currentUserNewNav?.email) {
    return (
      <View style={styles.loginPromptContainer}>
        <Text style={styles.loginPromptText}>Veuillez vous connecter pour accéder à cette page</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => props.navigation.navigate('LoginScreen')}
        >
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.barre}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.topScrollView}
        >
          <TouchableOpacity>
            <Text style={styles.topBarText}></Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView>
        <PubRect />

        {/* E-Books Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <FontAwesome name="book" size={24} color="#F16522" />
              BIBLIO ELECTRONIQUE
            </Text>

            <View style={styles.sectionTitleUnderline} />
          </View>
          
          <View style={styles.sectionDescription}>
            <Text style={styles.descriptionText}>
              Formez-vous à votre rythme avec des cours certifiants sur les plus grandes plateformes d'apprentissage en ligne.
            </Text>
          </View>
          
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {dataWeb.map((e, index) => (
              <SmallRect 
                key={index} 
                props={props} 
                image={e.image} 
                chemin={e.chemin} 
                name={e.name} 
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            <MaterialIcons name="recommend" size={24} color="#F16522" />
            RECOMMANDATIONS
          </Text>

          <View style={styles.sectionTitleUnderline} />
        </View>

        {/* Recommendations Section */}
        {renderRecommendationSection()}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            <MaterialCommunityIcons name="file-document-multiple" size={24} color="#F16522" />
            RESSOURCES DOCUMENTAIRES
          </Text>

          <View style={styles.sectionTitleUnderline} />
        </View>

        {/* Tab Selection Section */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('departement')}
            style={[
              styles.tabButton,
              activeTab === 'departement' ? styles.activeTabButton : styles.inactiveTabButton
            ]}
          >
            <Text style={styles.tabButtonText}>
              LIVRES
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('memoire')}
            style={[
              styles.tabButton,
              activeTab === 'memoire' ? styles.activeTabButton : styles.inactiveTabButton
            ]}
          >
            <Text style={styles.tabButtonText}>
              MEMOIRES
            </Text>
          </TouchableOpacity>
        </View>

        {/* Department or Memoir Section based on tab selection */}
        {activeTab === 'departement' ? (
          <View style={styles.categorySection}>
            <Text style={styles.categorySectionTitle}>
              LES LIVRES-DEPARTEMENTS
            </Text>
            <View style={styles.circleContainer}>
              <Cercle id="" datUser={datUser} image={imgMeca} cathegorie="Genie Mecanique" props={props} />
              <Cercle id="" datUser={datUser} image={imgInfo} cathegorie="Genie Informatique" props={props} />
              <Cercle id="" datUser={datUser} image={imgMath} cathegorie="Mathematique" props={props} />
            </View>
            <View style={styles.circleContainer}>
              <Cercle id="" datUser={datUser} image={imgElec} cathegorie="Genie Electrique" props={props} />
              <Cercle id="" datUser={datUser} image={imgPhysik} cathegorie="Physique" props={props} />
              <Cercle id="" datUser={datUser} image={imgTelcom} cathegorie="Genie Telecom" props={props} />
            </View>
          </View>
        ) : (
            <View style={styles.categorySection}>
              <Text style={styles.categorySectionTitle}>
                LES MEMOIRES-DEPARTEMENTS
              </Text>
              <View style={styles.circleContainer}>
                <TouchableOpacity onPress={() => handleMemoireClick('Memoire GI')}>
                  <Cercle id="" datUser={datUser} image={imgMemGI} cathegorie="Memoire GI" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMemoireClick('Memoire GC')}>
                  <Cercle id="" datUser={datUser} image={imgMemGC} cathegorie="Memoire GC" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMemoireClick('Memoire GM')}>
                  <Cercle id="" datUser={datUser} image={imgMemGM} cathegorie="Memoire GM" />
                </TouchableOpacity>
              </View>
              <View style={styles.circleContainer}>
                <TouchableOpacity onPress={() => handleMemoireClick('Memoire GInd')}>
                  <Cercle id="" datUser={datUser} image={imgMemGInd} cathegorie="Memoire GInd" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMemoireClick('Memoire GEle')}>
                  <Cercle id="" datUser={datUser} image={imgMemGEle} cathegorie="Memoire GEle" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMemoireClick('Memoire GTel')}>
                  <Cercle id="" datUser={datUser} image={imgMemGTel} cathegorie="Memoire GTel" />
                </TouchableOpacity>
              </View>
            </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Unified styles with consistent spacing, colors, and typography
const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topScrollView: {
    flexDirection: 'row',
  },
  topBarText: {
    fontFamily: 'San Francisco',
    fontSize: 20,
    marginRight: 10,
    color: COLORS.text.light,
  },
  
  // Login screen styles
  loginPromptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  loginPromptText: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'San Francisco',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  loginButtonText: {
    fontSize: 16,
    color: COLORS.text.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Section styles
  section: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'San Francisco',
    fontWeight: '900',
    color: COLORS.text.primary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionTitleUnderline: {
    width: 80,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 1.5,
  },
  sectionDescription: {
    marginBottom: 15,
  },
  descriptionText: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    paddingLeft: 5,
    paddingRight: 15,
    paddingVertical: 5,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.divider,
  },
  
  // Recommendation section styles
  recommendationContainer: {
    padding: 16,
    backgroundColor: COLORS.background,
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    padding: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 12,
    fontFamily: 'Roboto',
  },
  bookCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 10,
    overflow: 'hidden',
  },
  bookImage: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bookInfo: {
    padding: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.text.primary,
    fontFamily: 'San Francisco',
  },
  bookCategory: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto',
    marginBottom: 4,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  similarityScore: {
    fontSize: 14,
    color: COLORS.info,
    fontWeight: '500',
  },
  consultationScore: {
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '500',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    margin: 16,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.text.secondary,
    fontFamily: 'Roboto',
  },
  
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  tabButton: {
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: '45%',
  },
  activeTabButton: {
    backgroundColor: COLORS.primary,
  },
  inactiveTabButton: {
    backgroundColor: COLORS.secondary,
  },
  tabButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.white,
  },
  
  // Category section styles
  categorySection: {
    margin: 5,
    marginBottom: 20,
    padding: 10,
  },
  categorySectionTitle: {
    fontFamily: 'San Francisco',
    fontSize: 20,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  circleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 16,
  }
});

export default VueUn;