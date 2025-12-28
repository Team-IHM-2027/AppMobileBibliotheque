import { View, Text, ScrollView, Image,ImageBackground,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Cours = (props) => {
  const {partieDuCours,index,tableCours} = props.route.params 

  console.log('COURS',partieDuCours,index)

  const voirQuizz = () => {
    props.navigation.navigate('Quizz',{
    })    
  }

  const voirVideo = (vid)=>{
    props.navigation.navigate('VideoCours',{
      vid:vid
    })
  }

  
  const voirCours = (partieDuCours,index) => {
    props.navigation.navigate('Cours2',{
      partieDuCours:partieDuCours,
      index:index,
      tableCours:tableCours
    })
  }

  const chapSuivant = tableCours[index+1]

  return (
    <ScrollView style={{backgroundColor:'#fff'}}>


        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{flexDirection:'row'}}>
            <Text style={{color:'#000',fontWeight:'800',fontSize:20}}>{"<<"}</Text>
        </TouchableOpacity>

        <Text style={{textDecorationLine:'line-through',textDecorationColor:'#000',color:'gray',alignSelf:'center'}}>-                                                                  -</Text>


        <View style={{margin:7,width:WIDTH*0.9}}>
           <Text style={{color:'#000',fontWeight:'800',fontSize:17,textAlign:'center',fontFamily:'San Francisco'}}>1{partieDuCours.titre}</Text>
        </View>
         <ImageBackground style={{height:250,width:WIDTH}} source={require('../../assets/image/gi.jpg')}>
        <TouchableOpacity onPress={()=>voirVideo(partieDuCours.lienVideo)}>
            <Image style={{height:60,width:60,borderRadius:35,alignSelf:'center',marginTop:'20%'}} source={require('../../assets/image/logoPlay2.png')} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={{width:WIDTH*0.9,margin:5,}}>
        <Text style={{fontFamily:'Roboto'}}>{partieDuCours.texte1}</Text>
      </View>

      <Image style={{height:350,width:WIDTH}} source={{uri:partieDuCours.lienImage}} />

      <View style={{width:WIDTH*0.9,margin:5,}}>
        <Text style={{fontFamily:'Roboto'}}>{partieDuCours.texte2}</Text>
      </View>

      <View style={{justifyContent:'space-between',flexDirection:'row',marginRight:25,marginBottom:20}}>
        <Text></Text>
        <TouchableOpacity onPress={()=>voirCours(chapSuivant,index+1)} style={{height:40,width:100,marginTop:30,backgroundColor:'#191970'}}>
            <Text style={{color:'#fff',fontWeight:'800',fontSize:17,textAlign:'center',marginTop:7}}>Continuer</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  )
}


export default Cours