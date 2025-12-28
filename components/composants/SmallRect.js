import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'

const SmallRect = ({props, image, chemin, name}) => {
  const voirPageWeb = (chemin) => {
    props.navigation.navigate('PageWeb', {
      chemin: chemin
    })
  }
  
  return (
    <TouchableOpacity 
      onPress={() => voirPageWeb(chemin)} 
      style={styles.contain}
      activeOpacity={0.7}
    >
      <View style={styles.cardContainer}>
        <ImageBackground 
          style={styles.container} 
          source={{uri: image}}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay} />
          <View style={styles.newTag}>
            <Text style={styles.newText}>#new</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText} numberOfLines={2} ellipsizeMode="tail">
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contain: {
    height: 210,
    width: 140,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    height: 160,
    width: 140,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
  newTag: {
    height: 26,
    width: 50,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  newText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  textContainer: {
    marginTop: 10,
    width: 140,
    paddingHorizontal: 2,
  },
  nameText: {
    color: '#4a4a4a',
    fontSize: 14,
    flexWrap: 'wrap',
    lineHeight: 18,
    fontWeight: '600',
    textAlign: 'center',
  }
})

export default SmallRect