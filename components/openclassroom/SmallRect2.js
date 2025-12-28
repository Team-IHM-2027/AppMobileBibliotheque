import { View, Text, StyleSheet, Image, ImageBackground,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { UserContext } from '../navigation/NewNav'


const SmallRect2 = ({props,image,chemin,name}) => {

  const {modalArchive,setModalArchive}= useContext(UserContext)


  const voirPageWeb = (chemin) => {
    setModalArchive(!modalArchive)
    props.navigation.navigate('PageWeb2',{
     chemin:chemin
      
    })} 

  return (
  <TouchableOpacity onPress={()=>voirPageWeb(chemin)} style={styles.contain}>
  <ImageBackground style={styles.container} source={{uri:image}}>
    <View style={{height:25,width:35,backgroundColor:'gray'}}>
      <Text style={{fontSize:7,marginTop:9,textAlign:'center',}}>{name}</Text>
    </View>
  </ImageBackground>
  <View>
    <Text style={{color:'#000', fontSize:17}}>{name}</Text>
    <Text style={{color:'gray', fontSize:10,textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>9K fcfa</Text>
  </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contain:{
    height:170,
    width:130,
    marginTop:15,
    marginLeft:10,
  },
  container:{
  //  backgroundColor:'red',
   
    height:150,
    width:120,
    
  }
})

export default SmallRect2