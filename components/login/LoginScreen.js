import { View, Text,Image,StyleSheet,Dimensions,ScrollView } from 'react-native'
import React,{useContext} from 'react'
import LoginForm from './LogInForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const WIDTH = Dimensions.get('window').width * 1;
const HEIGHT = Dimensions.get('window').height*1


const LoginScreen = ({navigation}) => {
 
  return (
    <LoginForm navigation={navigation} />
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
       backgroundColor: 'white',
        paddingHorizontal:12,
       // height:HEIGHT
    },
     logoContainer:{
        alignItems:'center',
     //   marginTop:HEIGHT*0.099,
       
     },
     logoContainerA:{
      alignItems:'center',
     // marginBottom:HEIGHT*0.2
   },
   
})



export default LoginScreen