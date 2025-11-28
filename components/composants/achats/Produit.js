import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View, Alert, Modal, SafeAreaView, TextInput, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import React, { useContext, useEffect, useState } from 'react';
import { UserContextNavApp } from '../../navigation/NavApp';
import { API_URL } from '../../../apiConfig';
import { collection, doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, Timestamp, onSnapshot, getDoc, query, getDocs, increment, writeBatch, setDoc, limit } from "firebase/firestore";
import { useFirebase } from '../../context/FirebaseContext';
import BigRect from '../BigRect';
import PubCar from '../PubCar';
import PubRect from '../PubRect';
import { addNotification, NOTIFICATION_TYPES } from '../../utils/addNotification';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


// Fonction pour normaliser les chaînes (supprimer les accents)
const normalizeString = (str) => {
  if (!str) return ''; // Retourner une chaîne vide si str est undefined ou null
  return str.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ")
    .trim();
};

const Produit = ({ route, navigation }) => {
  // Extraire uniquement les données nécessaires de route.params
  const { salle, desc, etagere, exemplaire, image, name, cathegorie, commentaire, nomBD, type: bookType } = route.params || {};

  // Normaliser le nom du livre pour la recherche avec vérification
  const normalizedName = name ? normalizeString(name) : '';

  // Utiliser le contexte pour accéder à datUser au lieu des params
  const { currentUserdata } = useContext(UserContextNavApp);
  const { isFirebaseReady, db } = useFirebase();

  // Définir une valeur par défaut pour le type
  const type = bookType || cathegorie;

  const TITRE = name || '';
  const [dt, setDt] = useState(Timestamp.now());

  const [modalDescription, setModalDescription] = useState(false);
  const [modalComm, setModalComm] = useState(false);
  const [values, setValues] = useState("");
  const [valuesNote, setValuesNote] = useState("0");
  const [showAllComments, setShowAllComments] = useState(false);
  const [nomUser, setNomUser] = useState('');
  const [dat, setDat] = useState(0);
  const [comment, setComment] = useState(commentaire || []);
  const [datd, setDatd] = useState();
  const [mes, setMes] = useState();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [bookDescription, setBookDescription] = useState(desc || '');
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  const [currentExemplaire, setCurrentExemplaire] = useState(exemplaire);
  const [isReserving, setIsReserving] = useState(false);


  const ajouterRecent = async () => {
    if (!currentUserdata?.email) {
      Alert.alert('Erreur', 'Vous devez être connecté pour réserver un livre');
      return;
    }
    if (currentExemplaire <= 0) {
      Alert.alert('Erreur', 'Aucun exemplaire disponible');
      return;
    }

    setIsReserving(true);

    try {
      // Vérifier que toutes les données nécessaires sont présentes
      if (!name || !cathegorie) {
        console.error('Données manquantes:', { name, cathegorie, type });
        Alert.alert('Erreur', 'Données du livre incomplètes');
        return;
      }

      console.log('Tentative de réservation:', {
        name: name,
        normalized: normalizedName,
        cathegorie: cathegorie
      });

      const userRef = doc(db, "BiblioUser", currentUserdata.email);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Créer le document utilisateur s'il n'existe pas
        await setDoc(userRef, {
          email: currentUserdata.email,
          tabMessages: [],
          signalMessage: 'ras',
          docRecent: [],
          searchHistory: [],
          etat1: 'ras',
          etat2: 'ras',
          etat3: 'ras',
          tabEtat1: [],
          tabEtat2: [],
          tabEtat3: []
        });
      }

      const userData = userDoc.data() || {};

      // DEBUG: Afficher l'état actuel de tous les emplacements
      console.log('État actuel des emplacements:');
      console.log('etat1:', userData.etat1, 'tabEtat1:', userData.tabEtat1);
      console.log('etat2:', userData.etat2, 'tabEtat2:', userData.tabEtat2);
      console.log('etat3:', userData.etat3, 'tabEtat3:', userData.tabEtat3);

      // Vérifier le nombre de réservations actives (maximum 3)
      const activeReservations = [
        userData.etat1,
        userData.etat2,
        userData.etat3
      ].filter(etat => etat === 'reserv').length;

      console.log('Nombre de réservations actives:', activeReservations);

      if (activeReservations >= 3) {
        Alert.alert('Limite atteinte', 'Vous avez déjà 3 réservations actives. Veuillez attendre que certaines soient traitées avant d\'en faire de nouvelles.');
        return;
      }

      // Vérifier si le livre est déjà réservé par l'utilisateur
      const isAlreadyReserved = [
        userData.tabEtat1,
        userData.tabEtat2,
        userData.tabEtat3
      ].some(tabEtat => {
        if (Array.isArray(tabEtat) && tabEtat.length > 0) {
          const bookName = tabEtat[0];
          const isReserved = normalizeString(bookName) === normalizedName;
          if (isReserved) {
            console.log('Livre déjà réservé:', bookName);
          }
          return isReserved;
        }
        return false;
      });

      if (isAlreadyReserved) {
        Alert.alert('Information', 'Vous avez déjà réservé ce livre');
        return;
      }

      // Trouver un emplacement libre (etat1, etat2, ou etat3)
      let etatIndex = -1;
      for (let i = 1; i <= 3; i++) {
        const etatValue = userData[`etat${i}`];
        console.log(`Vérification etat${i}:`, etatValue);

        // Considérer comme libre si la valeur est 'ras', undefined, null, ou une chaîne vide
        if (!etatValue || etatValue === 'ras' || etatValue === '') {
          etatIndex = i;
          console.log(`Emplacement libre trouvé: etat${i}`);
          break;
        }
      }

      console.log('Index d\'emplacement trouvé:', etatIndex);

      if (etatIndex === -1) {
        console.error('Aucun emplacement libre trouvé. États actuels:', {
          etat1: userData.etat1,
          etat2: userData.etat2,
          etat3: userData.etat3
        });
        Alert.alert('Erreur', 'Aucun emplacement disponible pour une nouvelle réservation');
        return;
      }

      console.log(`Utilisation de l'emplacement etat${etatIndex}`);

      // Trouver le livre dans toutes les collections
      const collections = ['BiblioBooks'];
      let bookFound = false;

      for (const collectionName of collections) {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);

        for (const bookDoc of querySnapshot.docs) {
          const bookData = bookDoc.data();

          // Comparer les noms de livres
          if (normalizeString(bookData.name) === normalizedName) {
            console.log(`Livre trouvé dans ${collectionName}:`, bookData.name, 'Exemplaires:', bookData.exemplaire);

            // Vérifier les exemplaires disponibles
            if (bookData.exemplaire > 0) {
              const batch = writeBatch(db);

              // Mettre à jour le nombre d'exemplaires du livre
              batch.update(bookDoc.ref, {
                exemplaire: increment(-1)
              });

              // Mettre à jour l'état de réservation de l'utilisateur
              const updateData = {
                [`etat${etatIndex}`]: 'reserv',
                [`tabEtat${etatIndex}`]: [
                  name,
                  cathegorie,
                  image,
                  bookData.exemplaire - 1,
                  collectionName,
                  Timestamp.now(),
                  bookDoc.id // Ajouter l'ID du document pour faciliter les mises à jour futures
                ],
                docRecent: arrayUnion({
                  cathegorieDoc: cathegorie,
                  type: type
                })
              };

              console.log('Données de mise à jour:', updateData);

              batch.update(userRef, updateData);

              await batch.commit();

              // Ajouter une notification de réservation
              try {
                const notificationData = {
                  id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  type: 'reservation',
                  title: 'Réservation confirmée',
                  message: `Votre réservation pour le livre "${name}" (${cathegorie}) a été confirmée avec succès. Vous pouvez venir le retirer à la bibliothèque pendant les heures d'ouverture.`,
                  date: Timestamp.now(),
                  read: false
                };

                await updateDoc(userRef, {
                  notifications: arrayUnion(notificationData)
                });

                console.log('Notification de réservation ajoutée');
              } catch (notifError) {
                console.error('Erreur lors de l\'ajout de la notification:', notifError);
              }

              console.log('Réservation effectuée avec succès:', {
                name: name,
                cathegorie: cathegorie,
                exemplaires_restants: bookData.exemplaire - 1,
                collection: collectionName,
                emplacement: `etat${etatIndex}`
              });

              await addNotification(
                  currentUserdata.email,
                  NOTIFICATION_TYPES.RESERVATION,
                  'Réservation confirmée',
                  `Votre réservation pour "${name}" a été confirmée. Vous pouvez venir récupérer le livre à la bibliothèque.`
              );

              Alert.alert('Succès', `Livre réservé avec succès!\nEmplacement: ${etatIndex}/3`);
              bookFound = true;
              break;
            } else {
              Alert.alert('Erreur', 'Aucun exemplaire disponible pour ce livre');
              return;
            }
          }
        }
        if (bookFound) break;
      }

      if (!bookFound) {
        console.error('Livre non trouvé:', {
          name: name,
          normalized: normalizedName,
          searchedCollections: collections
        });
        Alert.alert('Erreur', 'Livre non trouvé dans la base de données');
      }

    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la réservation');
    }finally {
      setIsReserving(false);
    }
  };

  const reserver = async (userData) => {
    if (!currentUserdata?.email) {
      Alert.alert('Erreur', 'Vous devez être connecté pour réserver un livre');
      return;
    }

    try {
      // Déterminer la collection principale basée sur la catégorie
      let primaryCollection;
      switch (cathegorie) {
        case 'Genie Electrique':
          primaryCollection = 'BiblioGE';
          break;
        case 'Genie Informatique':
          primaryCollection = 'BiblioGI';
          break;
        case 'Genie Mecanique':
          primaryCollection = 'BiblioGM';
          break;
        case 'Genie Telecom':
          primaryCollection = 'BiblioGT';
          break;
        default:
          primaryCollection = 'BiblioInformatique';
      }

      // D'abord vérifier dans la collection principale
      let bookRef = doc(db, primaryCollection, name);
      let bookDoc = await getDoc(bookRef);

      // Si non trouvé, essayer avec le nom original
      if (!bookDoc.exists()) {
        const originalDocRef = doc(db, primaryCollection, name);
        bookDoc = await getDoc(originalDocRef);
      }

      if (bookDoc.exists()) {
        const bookData = bookDoc.data();
        console.log('Livre trouvé dans la collection principale:', {
          collection: primaryCollection,
          name: bookDoc.id,
          exemplaires: bookData.exemplaire
        });
        setData([{
          id: bookDoc.id,
          ...bookData,
          collection: primaryCollection
        }]);
        if (bookData.description && !desc) {
          setBookDescription(bookData.description);
        }
      } else {
        // Si non trouvé dans la collection principale, chercher dans les autres
        const otherCollections = ['BiblioBooks']
          .filter(c => c !== primaryCollection);

        let found = false;
        for (const collection of otherCollections) {
          // Essayer avec le nom normalisé
          let tempRef = doc(db, collection, normalizedName);
          let tempSnap = await getDoc(tempRef);

          // Si non trouvé, essayer avec le nom original
          if (!tempSnap.exists()) {
            tempRef = doc(db, collection, name);
            tempSnap = await getDoc(tempRef);
          }

          if (tempSnap.exists()) {
            const bookData = tempSnap.data();
            console.log('Livre trouvé dans une autre collection:', {
              collection: collection,
              name: tempSnap.id,
              exemplaires: bookData.exemplaire
            });
            setData([{
              id: tempSnap.id,
              ...bookData,
              collection: collection
            }]);
            if (bookData.description && !desc) {
              setBookDescription(bookData.description);
            }
            found = true;
            break;
          }
        }

        if (!found) {
          console.error('Livre non trouvé:', {
            name: name,
            normalized: normalizedName,
            searchedCollections: [primaryCollection, ...otherCollections]
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement du livre:", error);
      Alert.alert(
        'Erreur',
        'Une erreur est survenue lors du chargement des informations du livre.'
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setCurrentExemplaire(exemplaire);
  }, [exemplaire]);

  useEffect(() => {
    // Charger les commentaires au montage du composant
    const loadComments = async () => {
      try {
        const docRef = doc(db, 'BiblioInformatique', nomBD);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const bookData = docSnap.data();
          if (bookData.commentaire) {
            setComment(bookData.commentaire);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires:", error);
      }
    };

    loadComments();
    fetchSimilarBooks();
  }, [nomBD]);

  // Fonction pour ajouter à l'historique
  useEffect(() => {
    const addToHistory = async () => {
      if (!currentUserdata?.email || !isFirebaseReady || !db || !name) return;

      try {
        const userRef = doc(db, "BiblioUser", currentUserdata.email);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          await setDoc(userRef, {
            email: currentUserdata.email,
            historique: [],
            tabMessages: [],
            signalMessage: 'ras',
            docRecent: [],
            searchHistory: [],
            reservations: []
          });
        }

        const userData = userDoc.data() || {};
        const currentHistory = Array.isArray(userData.historique) ? userData.historique : [];

        const newHistoryItem = {
          cathegorieDoc: cathegorie || 'Non catégorisé',
          type: type || cathegorie || 'Non catégorisé',
          image: image || null,
          nameDoc: name,
          desc: desc || '',
          dateVue: Timestamp.now()
        };

        // Vérifier si l'élément existe déjà dans l'historique
        const exists = currentHistory.some(item =>
          item && item.nameDoc === newHistoryItem.nameDoc &&
          item.cathegorieDoc === newHistoryItem.cathegorieDoc
        );

        if (!exists) {
          const newHistory = [newHistoryItem, ...currentHistory].slice(0, 20); // Garder les 20 derniers
          await updateDoc(userRef, {
            historique: newHistory
          });
        }
      } catch (error) {
        console.error("Error adding to history:", error);
      }
    };

    addToHistory();
  }, [currentUserdata?.email, cathegorie, type, image, name, desc, isFirebaseReady, db]);

  // Écouter les changements de l'utilisateur
  useEffect(() => {
    if (!currentUserdata?.email || !isFirebaseReady || !db) return;

    const userRef = doc(db, 'BiblioUser', currentUserdata.email);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setDatd(doc.data());
        setMes(doc.data().name);
      }
    }, (error) => {
      console.error("Erreur lors de l'écoute des changements utilisateur:", error);
    });

    return () => unsubscribe();
  }, [currentUserdata?.email, isFirebaseReady, db]);

  const handleAddComment = async () => {
    if (!currentUserdata?.email) {
      Alert.alert('Erreur', 'Vous devez être connecté pour laisser un avis');
      return;
    }

    if (!valuesNote || valuesNote === '0') {
      Alert.alert('Erreur', 'Veuillez donner une note');
      return;
    }

    if (!values.trim()) {
      Alert.alert('Erreur', 'Veuillez écrire un commentaire');
      return;
    }

    try {
      // Récupérer le nom de l'utilisateur depuis BiblioUser
      const userRef = doc(db, 'BiblioUser', currentUserdata.email);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert('Erreur', 'Votre profil utilisateur n\'a pas été trouvé');
        return;
      }

      const userData = userSnap.data();
      if (!userData.name) {
        Alert.alert('Erreur', 'Votre nom n\'est pas défini dans votre profil. Veuillez compléter votre profil avant de laisser un avis.');
        return;
      }
      const userName = userData.name;

      // Déterminer la collection en fonction de la catégorie
      let targetCollection = 'BiblioInformatique'; // Par défaut
      switch (cathegorie) {
        case 'Genie Electrique':
          targetCollection = 'BiblioGE';
          break;
        case 'Genie Informatique':
          targetCollection = 'BiblioGI';
          break;
        case 'Genie Mecanique':
          targetCollection = 'BiblioGM';
          break;
        case 'Genie Telecom':
          targetCollection = 'BiblioGT';
          break;
      }

      let bookFound = false;
      let bookRef;
      let bookData;

      // D'abord chercher dans la collection principale
      const docRef = doc(db, targetCollection, name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        bookRef = docRef;
        bookData = docSnap.data();
        bookFound = true;
      } else {
        // Si non trouvé, chercher dans toutes les collections
        const collections = ['BiblioBooks'];

        let bookFound = false;
        for (const collectionName of collections) {
          const q = query(collection(db, collectionName));
          const querySnapshot = await getDocs(q);

          for (const docSnapshot of querySnapshot.docs) {
            const bookData = docSnapshot.data();
            if (normalizeString(bookData.name) === normalizedName) {
              // Livre trouvé, vérifier les exemplaires
              if (bookData.exemplaire > 0) {
                const batch = writeBatch(db);

                // Mettre à jour le nombre d'exemplaires
                const bookRef = docSnapshot.ref;
                batch.update(bookRef, {
                  exemplaire: increment(-1)
                });

                // Mettre à jour l'état de réservation de l'utilisateur
                const updateData = {
                  [`etat${etatIndex}`]: 'reserv',
                  [`tabEtat${etatIndex}`]: [name, cathegorie, image, bookData.exemplaire - 1, collectionName, Timestamp.now()],
                  docRecent: arrayUnion({
                    cathegorieDoc: cathegorie,
                    type: type
                  })
                };

                const userRef = doc(db, "BiblioUser", currentUserdata.email);
                batch.update(userRef, updateData);

                await batch.commit();

                // MISE À JOUR LOCALE IMMÉDIATE
                setCurrentExemplaire(prev => Math.max(0, prev - 1));

                // Ajouter notification
                await addNotification(
                    currentUserdata.email,
                    NOTIFICATION_TYPES.RESERVATION,
                    'Réservation confirmée',
                    `Votre réservation pour "${name}" a été confirmée.`
                );

                console.log('Réservation effectuée:', {
                  name: name,
                  cathegorie: cathegorie,
                  exemplaires: bookData.exemplaire - 1,
                  collection: collectionName
                });

                Alert.alert('Succès', 'Livre réservé avec succès');
                bookFound = true;
                break;
              } else {
                Alert.alert('Erreur', 'Aucun exemplaire disponible');
                setCurrentExemplaire(0);
                return;
              }
            }
          }
          if (bookFound) break;
        }
      }

      if (!bookFound) {
        console.error('Livre non trouvé:', {
          name: name,
          normalized: normalizedName,
          searchedCollections: collections
        });
        Alert.alert('Erreur', 'Livre non trouvé dans la base de données');
      }

      // Ajouter le commentaire
      const currentComments = Array.isArray(bookData.commentaire) ? bookData.commentaire : [];

      const newComment = {
        nomUser: userName,
        texte: values.trim(),
        note: valuesNote,
        heure: Timestamp.now(),
        userId: currentUserdata.uid
      };

      // Vérifier si l'utilisateur a déjà commenté
      const userCommentIndex = currentComments.findIndex(comment => comment.userId === currentUserdata.uid);

      let updatedComments;
      if (userCommentIndex !== -1) {
        updatedComments = [...currentComments];
        updatedComments[userCommentIndex] = newComment;
      } else {
        updatedComments = [newComment, ...currentComments];
      }

      // Mettre à jour le document avec les commentaires mis à jour
      await updateDoc(bookRef, {
        commentaire: updatedComments
      });

      setComment(updatedComments);
      setValues("");
      setValuesNote("0");
      setModalComm(false);

      Alert.alert('Succès', 'Votre avis a été ajouté avec succès');
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      if (error.code === 'permission-denied') {
        Alert.alert('Erreur', "Vous n'avez pas les permissions nécessaires pour ajouter un commentaire.");
      } else {
        Alert.alert('Erreur', "Une erreur s'est produite lors de l'ajout de votre commentaire. Veuillez réessayer plus tard.");
      }
    }
  };

  var date = new Date()
  date.setDate(date.getDate() + 2)

  function addDays(date, days) {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  function voirArticle(name, cathegorie, image, desc, exemplaire) {
    navigation.navigate('PageBiblio', {
      name: name,
      cathegorie: cathegorie,
      image: image,
      desc: desc,
      exemplaire: exemplaire
    })
  }

  const voirComm = (name, cathegorie, image, desc, exemplaire) => {
    navigation.navigate('PageBiblio', {
      name: name,
      cathegorie: cathegorie,
      image: image,
      desc: desc,
      exemplaire: exemplaire
    })
  }

  // Fonction pour calculer la similarité entre deux chaînes
  const calculateSimilarity = (str1, str2) => {
    if (!str1 || !str2) return 0;
    const s1 = normalizeString(str1).split(' ').filter(Boolean);
    const s2 = normalizeString(str2).split(' ').filter(Boolean);

    if (s1.length === 0 || s2.length === 0) return 0;

    // Compter les mots communs
    const commonWords = s1.filter(word => s2.includes(word));

    // Calculer le score de similarité (0 à 1)
    return commonWords.length / Math.max(s1.length, s2.length);
  };

  const fetchSimilarBooks = async () => {
    if (!name) {
      console.log('Nom du livre manquant pour la recherche');
      return;
    }

    setLoadingSimilar(true);

    try {
      // Récupérer les livres de toutes les collections pertinentes
      const collections = ['BiblioGE', 'BiblioGI', 'BiblioGM', 'BiblioGT', 'BiblioInformatique'];
      let allBooks = [];

      for (const collectionName of collections) {
        try {
          const booksRef = collection(db, collectionName);
          const q = query(booksRef);
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const bookData = doc.data();
            if (bookData && bookData.name && bookData.name !== name) {
              allBooks.push({
                id: doc.id,
                title: bookData.name || '',
                category: bookData.cathegorie || 'Non catégorisé',
                image: bookData.image || null,
                description: bookData.desc || '',
                exemplaire: bookData.exemplaire || 0,
                collection: collectionName
              });
            }
          });
        } catch (error) {
          console.error(`Erreur lors de la lecture de ${collectionName}:`, error);
        }
      }

      // Calculer les scores de similarité pour chaque livre
      const scoredBooks = allBooks.map(book => ({
        ...book,
        score: calculateSimilarity(name, book.title) * 0.6 + // Similarité du titre (60%)
               (book.category === cathegorie ? 0.4 : 0) // Même catégorie (40%)
      }));

      // Trier par score et prendre les 5 meilleurs
      const recommendations = scoredBooks
        .sort((a, b) => b.score - a.score)
        .filter(book => book.score > 0.1) // Garder uniquement les livres avec un score minimum
        .slice(0, 5);

      console.log('Livres similaires trouvés:', recommendations.length);

      setSimilarBooks(recommendations);

      if (recommendations.length === 0) {
        console.log('Aucune recommandation trouvée pour:', name);
      }

    } catch (error) {
      console.error('Erreur lors de la recherche de livres similaires:', error);
      setSimilarBooks([]);
    } finally {
      setLoadingSimilar(false);
    }
  };

  // Calculer la note moyenne
  const calculateAverageRating = () => {
    if (!comment || comment.length === 0) return 0;
    const sum = comment.reduce((acc, curr) => acc + Number(curr.note), 0);
    return (sum / comment.length).toFixed(1);
  };

  // Calculer le nombre d'avis par note
  const calculateRatingDistribution = () => {
    const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    if (!comment || comment.length === 0) return distribution;

    comment.forEach(c => {
      const note = Number(c.note);
      if (note >= 1 && note <= 5) {
        distribution[note] = (distribution[note] || 0) + 1;
      }
    });
    return distribution;
  };

  // Ajouter un state pour gérer l'expansion des commentaires
  const [expandedComments, setExpandedComments] = useState({});

  // Fonction pour basculer l'expansion d'un commentaire
  const toggleCommentExpansion = (commentId) => {
    setExpandedComments(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  return (
    <React.Fragment>
      <ScrollView>
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <Image style={{ width: WIDTH * 0.8, height: HEIGHT * 0.5, resizeMode: 'contain' }} source={{ uri: image }} />
          </View>
          <View style={styles.slide2}>
            <Image style={{ width: WIDTH * 0.8, height: HEIGHT * 0.5, resizeMode: 'contain' }} source={require('../../../assets/ensp.png')} />
          </View>
          {/* <View style={styles.slide3}>
            <Image style={{ width: WIDTH * 0.8, height: HEIGHT * 0.5, resizeMode: 'contain' }} source={require('../../../assets/image/sold2.jpg')} />
          </View>*/}
        </Swiper>

        <View style={styles.bookDetailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.bookTitle}>{TITRE}</Text>
            <View style={styles.exemplairesContainer}>
              <Text style={[
                styles.exemplairesText,
                currentExemplaire > 0 ? styles.disponible : styles.nonDisponible
              ]}>
                {currentExemplaire > 0
                    ? `${currentExemplaire} exemplaire${currentExemplaire > 1 ? 's' : ''} disponible${currentExemplaire > 1 ? 's' : ''}`
                    : 'Indisponible'
                }
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Catégorie:</Text>
            <Text style={styles.infoValue}>{cathegorie}</Text>
          </View>

          <TouchableOpacity
              style={[
                styles.empruntButton,
                (currentExemplaire === 0 || isReserving) && styles.empruntButtonDisabled
              ]}
              onPress={ajouterRecent}
              disabled={currentExemplaire === 0 || isReserving}
          >
            <Text style={styles.empruntButtonText}>
              {isReserving
                  ? 'Réservation...'
                  : currentExemplaire === 0
                      ? 'Indisponible'
                      : 'Réserver'
              }
            </Text>
          </TouchableOpacity>
        </View>

        {/** DESCRIPTION */}
        <View style={styles.descriptionContainer}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <TouchableOpacity
              onPress={() => setModalDescription(true)}
              style={styles.seeMoreButton}
            >
              <Text style={styles.seeMoreText}>Voir plus</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionText}>
            {bookDescription ?
              (bookDescription.length > 150 ?
                `${bookDescription.slice(0, 150)}...` :
                bookDescription
              ) :
              "Aucune description disponible"
            }
          </Text>
        </View>

        {/** EMPLACEMENT */}
        <View style={styles.locationContainer}>
          <Text style={styles.locationTitle}>Emplacement</Text>
          <View style={styles.locationDetails}>
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Salle</Text>
              <Text style={styles.locationValue}>{salle}</Text>
            </View>
            <View style={styles.locationDivider} />
            <View style={styles.locationItem}>
              <Text style={styles.locationLabel}>Étagère</Text>
              <Text style={styles.locationValue}>{etagere}</Text>
            </View>
          </View>
        </View>

        {/** NOTES ET AVIS */}
        <View style={styles.reviewsContainer}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>Notes et avis</Text>
            <TouchableOpacity
              style={styles.addReviewButton}
              onPress={() => setModalComm(true)}
            >
              <Text style={styles.addReviewButtonText}>Donner mon avis</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ratingSummary}>
            <View style={styles.averageRatingContainer}>
              <Text style={styles.averageRating}>{calculateAverageRating()}</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Text key={star} style={styles.starIcon}>
                    {star <= Math.round(calculateAverageRating()) ? '★' : '☆'}
                  </Text>
                ))}
              </View>
              <Text style={styles.totalReviews}>{comment.length} avis</Text>
            </View>

            <View style={styles.ratingBarsContainer}>
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = calculateRatingDistribution()[rating] || 0;
                const percentage = comment.length > 0 ? (count / comment.length) * 100 : 0;
                return (
                  <View key={rating} style={styles.ratingBarRow}>
                    <Text style={styles.ratingNumber}>{rating}</Text>
                    <View style={styles.ratingBarBackground}>
                      <View style={[styles.ratingBarFill, { width: `${percentage}%` }]} />
                    </View>
                    <Text style={styles.ratingCount}>{count}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Liste des commentaires récents */}
          <View style={styles.recentReviews}>
            <Text style={styles.recentReviewsTitle}>Commentaires récents</Text>
            {comment && comment.length > 0 ? (
              <>
                {comment.slice(0, 3).map((review, index) => (
                  <View key={index} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewerInfo}>
                        <Text style={styles.reviewerName}>{review.nomUser}</Text>
                        <Text style={styles.reviewDate}>
                          {review.heure?.seconds ?
                            new Date(review.heure.seconds * 1000).toLocaleDateString() :
                            new Date().toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.reviewRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Text key={star} style={styles.reviewStarIcon}>
                            {star <= Number(review.note) ? '★' : '☆'}
                          </Text>
                        ))}
                      </View>
                    </View>
                    <View>
                      <Text style={styles.reviewText}>
                        {expandedComments[index] || review.texte.length <= 100
                          ? review.texte
                          : review.texte.slice(0, 100) + '...'}
                      </Text>
                      {review.texte.length > 100 && (
                        <TouchableOpacity
                          onPress={() => toggleCommentExpansion(index)}
                          style={styles.seeMoreButton}
                        >
                          <Text style={styles.seeMoreText}>
                            {expandedComments[index] ? 'Voir moins' : 'Voir plus'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}

                {showAllComments && comment.length > 3 && (
                  <View style={styles.additionalComments}>
                    {comment.slice(3).map((review, index) => (
                      <View key={index} style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                          <View style={styles.reviewerInfo}>
                            <Text style={styles.reviewerName}>{review.nomUser}</Text>
                            <Text style={styles.reviewDate}>
                              {review.heure?.seconds ?
                                new Date(review.heure.seconds * 1000).toLocaleDateString() :
                                new Date().toLocaleDateString()}
                            </Text>
                          </View>
                          <View style={styles.reviewRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Text key={star} style={styles.reviewStarIcon}>
                                {star <= Number(review.note) ? '★' : '☆'}
                              </Text>
                            ))}
                          </View>
                        </View>
                        <Text style={styles.reviewText}>{review.texte}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {comment.length > 3 && (
                  <TouchableOpacity
                    style={styles.seeAllReviewsButton}
                    onPress={() => setShowAllComments(!showAllComments)}
                  >
                    <Text style={styles.seeAllReviewsText}>
                      {showAllComments ? 'Voir moins d\'avis' : `Voir ${comment.length - 3} avis supplémentaires`}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <Text style={styles.noReviews}>Aucun avis pour le moment</Text>
            )}
          </View>
        </View>

        {/**LIVRES SIMILAIRES */}
        <View style={styles.similarBooksContainer}>
          <View style={styles.similarBooksHeader}>
            <Text style={styles.similarBooksTitle}>Livres similaires</Text>
          </View>
          {loadingSimilar ? (
            <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
          ) : similarBooks.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarBookScroll}>
              {similarBooks.map((book, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.similarBookCard}
                  onPress={() => navigation.navigate('Produit', {
                    name: book.title,
                    cathegorie: book.category,
                    image: book.image,
                    desc: book.desc,
                    exemplaire: book.exemplaire,
                    nomBD: book.nomBD,
                    type: book.type,
                    salle: book.salle || '',
                    etagere: book.etagere || ''
                  })}
                >
                  <Image
                    source={{ uri: book.image }}
                    style={styles.similarBookImage}
                    defaultSource={require('../../../assets/biblio/math.jpg')}
                  />
                  <View style={styles.similarBookInfo}>
                    <Text style={styles.similarBookTitle} numberOfLines={2}>{book.title}</Text>
                    <Text style={styles.similarBookCategory}>{book.category}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noSimilarBooks}>Aucun livre similaire trouvé</Text>
          )}
        </View>

      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalComm}
        onRequestClose={() => setModalComm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Donner mon avis</Text>

            <View style={styles.ratingInput}>
              <Text style={styles.ratingLabel}>Note :</Text>
              <View style={styles.starRatingContainer}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    onPress={() => setValuesNote(rating.toString())}
                  >
                    <Text style={[
                      styles.starRatingIcon,
                      { color: rating <= parseInt(valuesNote) ? '#FFD700' : '#ddd' }
                    ]}>
                      ★
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TextInput
              style={styles.commentInput}
              placeholder="Écrivez votre avis ici..."
              multiline
              numberOfLines={4}
              value={values}
              onChangeText={setValues}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalComm(false);
                  setValues('');
                  setValuesNote('0');
                }}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleAddComment}
              >
                <Text style={styles.submitButtonText}>Publier</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalDescription}
        onRequestClose={() => setModalDescription(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Description complète</Text>
            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.modalDescriptionText}>
                {bookDescription || "Aucune description disponible"}
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalDescription(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 450
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    height: 250,
    padding: 10,
    width: 350,
    borderRadius: 20,
    color: '#000',
    marginLeft: 30,

  },
  search: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 15
  },
  input2: {
    borderWidth: 1,
    height: 40,
    padding: 10,
    width: 350,
    borderRadius: 20,
    color: '#000',
    marginLeft: 30,

  },
  search2: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 15
  },
  bookDetailsContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    marginBottom: 15,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  exemplairesContainer: {
    marginTop: 5,
  },
  exemplairesText: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  disponible: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  nonDisponible: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  empruntButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  empruntButtonDisabled: {
    backgroundColor: '#ccc',
  },
  empruntButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  locationTitle: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'Roboto',
    marginBottom: 15,
  },
  locationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  locationItem: {
    flex: 1,
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  locationValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  locationDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  descriptionTitle: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'San Francisco',
  },
  seeMoreButton: {
    padding: 5,
  },
  seeMoreText: {
    color: '#FF6600',
    fontSize: 15,
  },
  descriptionText: {
    color: '#666',
    fontSize: 15,
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalScrollView: {
    maxHeight: '80%',
  },
  modalDescriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#FF6600',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  modalCloseButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  // ... (previous styles remain the same)

  similarBooksContainer: {
    backgroundColor: '#FFF',
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  similarBooksHeader: {
    marginBottom: 15,
  },
  similarBooksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  similarBookScroll: {
    paddingBottom: 15,
  },
  similarBookCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  similarBookImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  similarBookInfo: {
    padding: 12,
    backgroundColor: '#fff',
  },
  similarBookTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  similarBookCategory: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  noSimilarBooks: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  loader: {
    marginVertical: 20,
  },

  reviewsContainer: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 15,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviewsTitle: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'San Francisco',
  },
  addReviewButton: {
    backgroundColor: '#FF6600',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addReviewButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  ratingSummary: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
  },
  averageRatingContainer: {
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    paddingRight: 15,
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  starIcon: {
    color: '#FFD700',
    fontSize: 18,
    marginHorizontal: 1,
  },
  totalReviews: {
    color: '#666',
    fontSize: 12,
  },
  ratingBarsContainer: {
    flex: 2,
    paddingLeft: 15,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  ratingNumber: {
    width: 15,
    fontSize: 12,
    color: '#666',
  },
  ratingBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  ratingCount: {
    width: 20,
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  recentReviews: {
    marginTop: 20,
  },
  recentReviewsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  reviewCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: '600',
    fontSize: 14,
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewStarIcon: {
    color: '#FFD700',
    fontSize: 14,
    marginLeft: 1,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  noReviews: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  seeAllReviewsButton: {
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  seeAllReviewsText: {
    color: '#FF6600',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingInput: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  starRatingIcon: {
    fontSize: 35,
    marginHorizontal: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  submitButton: {
    backgroundColor: '#FF6600',
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
})

export default Produit