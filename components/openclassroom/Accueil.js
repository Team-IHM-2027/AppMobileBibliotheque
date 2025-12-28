import { View, Text, ImageBackground, Dimensions, Image, TouchableOpacity,ActivityIndicator,StyleSheet,Alert } from 'react-native'
import React,{useEffect} from 'react'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Accueil = ({navigation}) => {

    const [loaded, setLoaded]= React.useState(true)
   // const timer = setTimeout(() => { setLoaded(true)}, 4000);
      
   
   useEffect(() => {
    const timer = setTimeout(() => {
     setLoaded(false)
  //   navigation.replace('Departement')
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  

    const voirDepartement = () => {
        navigation.navigate('Departement',{
        })    
      } 

      {/**#4682B4 */}
  return (
    <React.Fragment>
    <View>
        <Image  style={{height:HEIGHT*0.6,width:WIDTH,}} source={require('../../assets/elea33.jpg')} />
    </View>

    <View style={{backgroundColor:'#fff',height:'100%'}}>
        <View>
            <Text style={{textAlign:'center',marginTop:15,fontFamily:'San Francisco',fontWeight:'900',fontSize:29,color:'#000'}}>POLYTECH'LEARNING</Text>
            <Text style={{textAlign:'center',color:'#000'}}>Tranformer votre carriere en obtenant un diplome en ligne.</Text>
        </View>

        <View>
            <TouchableOpacity onPress={()=> voirDepartement()} style={{backgroundColor:'#000',height:50,width:130,alignSelf:'center',marginTop:30,borderRadius:20,shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,}}>
                <Text style={{textAlign:'center',fontFamily:'Roboto',color:'#fff',marginTop:13,fontSize:20,fontWeight:'600'}}>Continuer</Text>
            </TouchableOpacity>
        </View>
        {
            loaded ? 
            <ActivityIndicator size="large" color="red" />
            :
            <View></View>
        }
       


    </View>

    </React.Fragment>
  )
}



export default Accueil

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FCF5DB',
        
    },

})