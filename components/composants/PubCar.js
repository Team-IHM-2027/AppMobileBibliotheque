import { View, Text, Dimensions, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

const HEIGHT= Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const PubCar = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={{height:'100%', flex:1}} source={require('../../assets/biblio/study-group-african-people.jpg')}></ImageBackground>
      <ImageBackground style={{height:'100%', flex:1}} source={require('../../assets/biblio/young-student-working-assignment.jpg')}></ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:2,
   // backgroundColor:'red',
    height:200,
    width:WIDTH,
    flexDirection:'row',
  }
})


export default PubCar