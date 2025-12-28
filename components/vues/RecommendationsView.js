import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const RecommendationSection = ({ currentUser, navigation }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://recommendation.up.railway.app";

  const fetchRecommendations = async (email) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/recommendations/similar-users/${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.recommendations) {
        // Formater les recommandations pour l'affichage
        const formattedRecommendations = data.recommendations.map(book => ({
          ...book,
          similarity_score: Math.round(book.similarity_score * 100)
        }));
        setRecommendations(formattedRecommendations);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des recommandations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularBooks = async () => {
    try {
      const response = await fetch(`${API_URL}/popular-books`);
      const data = await response.json();
      setPopularBooks(data.popular_books);
    } catch (error) {
      console.error('Erreur lors du chargement des livres populaires:', error);
    }
  };

  useEffect(() => {
    if (currentUser?.email) {
      Promise.all([
        fetchRecommendations(currentUser.email),
        fetchPopularBooks()
      ]);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Chargement des recommandations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Section Recommandations Personnalisées */}
      {recommendations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommandé pour vous</Text>
          <Text style={styles.subtitle}>Basé sur 3 utilisateurs similaires</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendations.map((book, index) => (
              <TouchableOpacity
                key={index}
                style={styles.bookCard}
                onPress={() => navigation.navigate('Produit', {
                  name: book.title,
                  desc: book.description,
                  image: book.image,
                  cathegorie: book.category,
                  type: book.type
                })}
              >
                <Image source={{ uri: book.image }} style={styles.bookImage} />
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                  <Text style={styles.bookCategory}>
                    {book.category} • {book.type}
                  </Text>
                  <Text style={styles.similarityScore}>
                    {book.similarity_score}% pertinent
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Section Livres Populaires */}
      {popularBooks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Populaire dans la bibliothèque</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularBooks.map((book, index) => (
              <TouchableOpacity
                key={index}
                style={styles.bookCard}
                onPress={() => navigation.navigate('Produit', {
                  name: book.title,
                  desc: book.description,
                  image: book.image,
                  cathegorie: book.category,
                  type: book.type
                })}
              >
                <Image source={{ uri: book.image }} style={styles.bookImage} />
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                  <Text style={styles.bookCategory}>
                    {book.category} • {book.type}
                  </Text>
                  <Text style={styles.consultations}>
                    {book.view_count} consultations
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 15,
    marginBottom: 5,
    fontFamily: 'San Francisco',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginLeft: 15,
    marginBottom: 15,
  },
  bookCard: {
    width: 160,
    marginLeft: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 5,
  },
  bookImage: {
    width: '100%',
    height: 200,
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
    color: '#2c3e50',
  },
  bookCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  similarityScore: {
    fontSize: 14,
    color: '#FF8A50',
    fontWeight: '500',
  },
  consultations: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '500',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});

export default RecommendationSection;