import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const libraryImages = [
  { id: '1', source: require('../../assets/biblio/bibliotheque.jpg'), title: 'Bibliothèque moderne' },
  { id: '2', source: require('../../assets/biblio/focused-black-student-guy-headphones.webp'), title: 'Espace de lecture' },
  { id: '3', source: require('../../assets/bibi.jpg'), title: 'Collection de livres' },
  { id: '4', source: require('../../assets/biblio/study-group-african-people.jpg'), title: 'Zone d\'étude' },
];

const PubRect = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Fonction pour changer l'index actif lors du défilement
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / WIDTH);
    setActiveIndex(index);
  };

  // Rendu de chaque élément du carousel
  const renderItem = ({ item }) => {
    return (
        <View style={styles.slideContainer}>
          <Image source={item.source} style={styles.image} />
          <View style={styles.overlay}>
            <Text style={styles.imageTitle}>{item.title}</Text>
          </View>
        </View>
    );
  };

  // Rendu des indicateurs de pagination
  const renderDotIndicators = () => {
    return libraryImages.map((_, index) => {
      return (
          <TouchableOpacity
              key={index}
              style={[styles.dot, activeIndex === index ? styles.activeDot : {}]}
              onPress={() => {
                setActiveIndex(index);
                flatListRef.current.scrollToIndex({ animated: true, index });
              }}
          />
      );
    });
  };

  return (
      <View style={styles.container}>
        {/* Carousel d'images */}
        <FlatList
            ref={flatListRef}
            data={libraryImages}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            keyExtractor={item => item.id}
        />

        {/* Indicateurs de pagination */}
        <View style={styles.dotContainer}>
          {renderDotIndicators()}
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slideContainer: {
    width: WIDTH,
    height: HEIGHT * 0.4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  imageTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#333',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default PubRect;