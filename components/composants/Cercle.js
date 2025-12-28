import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Cercle = ({ cathegorie, image, datUser }) => {
  const navigation = useNavigation();

  const voirCathegorie = () => {
    navigation.navigate('Cathegorie', {
      cathegorie,
      datUser
    })    
  } 

  return (
    <TouchableOpacity onPress={voirCathegorie} style={styles.contain}>
      <View style={styles.container}>
        <Image style={{height:'100%',width:'100%',borderRadius:60,resizeMode:'cover'}} source={image} />
      </View>
      <Text style={{textAlign:'center'}}>{cathegorie ? (cathegorie.length > 12 ? cathegorie.slice(0,12)+'...' : cathegorie) : ''}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contain:{
    marginTop:2,
    justifyContent:'center',
    flexDirection:'column',
    marginRight:3,
    marginLeft:2,
    marginBottom:20
  },
  container:{
    backgroundColor:'#DCDCDC',
    marginTop:1,
    height:80,
    width:80,
    borderRadius:60,
  }
})

export default Cercle