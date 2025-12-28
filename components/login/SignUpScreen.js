import { View,Image,StyleSheet,Dimensions,ScrollView } from 'react-native'
import React from 'react'
import SignUpForm from './SignUpForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const WIDTH = Dimensions.get('window').width * 1;
const HEIGHT = Dimensions.get('window').height*1


const SignUpScreen = ({navigation}) => {
  
  return (


      <SignUpForm navigation={navigation} />

    
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
        paddingHorizontal:12,
    },
     logoContainer:{
        alignItems:'center',
        marginTop:HEIGHT*0.099,
     },
     logoContainerA:{
      alignItems:'center',
      marginBottom:HEIGHT*0.2     
   },
   
})



export default SignUpScreen