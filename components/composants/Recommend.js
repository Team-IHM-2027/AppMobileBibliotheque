import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import BigRect from './BigRect';
import { API_URL } from '../../apiConfig';

const WIDTH = Dimensions.get('window').width;

const Recommend = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/recommendations/popular`);
        const data = await response.json();
        setRecommendations(data.books || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des recommandations :", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const renderBigRect = ({ item }) => (
    <BigRect {...item} navigation={navigation} />
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (recommendations.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Aucune recommandation disponible pour le moment</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recommendations}
        renderItem={renderBigRect}
        keyExtractor={(item) => item.id || Math.random().toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default Recommend;
