import { View, Text, ScrollView, Dimensions, TouchableOpacity,Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { set } from 'react-native-reanimated'
//import { Video, AVPlaybackStatus } from 'expo-av';

const WIDTH = Dimensions.get('window').width

const vid = 'https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link'

const Semestre = (props) => {

  const {nom,img,num,num1,num2,video} = props.route.params

//  console.log(nom)

  const voirMatiere = (numgo) => {
    props.navigation.navigate('TableMatiere',{
      numgo:numgo
    })    
  } 

  const voirVideo = (video) => {
    props.navigation.navigate('VideoCours',{
      vid:video
    })    
  } 
  const [sem,setSem]=useState('s1')


  return (
    <ScrollView style={{backgroundColor:'#fff',width:WIDTH}}>
      <TouchableOpacity style={{shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,width:50,marginLeft:20}} onPress={()=>props.navigation.goBack()}>
        <View style={{backgroundColor:'#000',padding:1,borderRadius:25,marginTop:15}}>
        <Text style={{fontSize:20,color:'#fff',textAlign:'center'}}>{'<<'}</Text>
        </View>
      </TouchableOpacity>
     
     <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
      <ImageBackground style={{height:250,borderRadius:15,width:200}} source={img}>
        <TouchableOpacity onPress={()=>voirVideo(video)}>
            <Image style={{height:60,width:60,borderRadius:35,alignSelf:'center',marginTop:100}} source={require('../../assets/playvideo.png')} />
        </TouchableOpacity>
      </ImageBackground>
      <View style={{width:200}}>
        <Text style={{padding:5,textAlign:'center',color:'rgb(136,136,136)',fontSize:20,fontWeight:'800'}}>{nom}</Text>
        <Text style={{marginLeft:10,marginRight:10,fontSize:12}}>Aborder et mettre en œuvre les principales démarches en architecture système. Acquérir les bases pour élaborer l'architecture d’un système complexe. Formation courte. Experts renommés. Accompagnement sur mesure. Programmes d'études: Digital, Entreprenariat.</Text>
        <Text style={{padding:5,textAlign:'center',color:'rgb(136,136,136)',fontSize:12,fontWeight:'800'}}>cliquez sur la video pour en savoir plus.</Text>
      
      </View>
      </View>


      <View style={{padding:10}}>
        <View style={{flexDirection:'row',alignContent:'center',width:WIDTH,alignSelf:'center',alignItems:'center',padding:10}}>
        <Text style={{fontFamily:'San Francisco',color:'rgb(136,136,136)',margin:1,textAlign:'center'}}>CD :</Text>
        <Text style={{fontFamily:'San Francisco',color:'rgb(136,136,136)',margin:1,textAlign:'center'}}>prof BOUETOU</Text>
        </View>
       {/* <View style={{flexDirection:'row',marginLeft:20,margin:10}}>
            <Image style={{height:30,width:30,borderRadius:30}} source={require('../../assets/image/barre.jpg')} />
            <Text style={{marginTop:7,marginLeft:4,color:'rgb(136,136,136)'}}>Difficile</Text>
        </View>*/}
       {/* 
        <Video isMuted shouldPlay source={{video}} style={{width:WIDTH,height:200,}} useNativeControls resizeMode='cover' />      

  */}

    <View style={{height:1,width:WIDTH,backgroundColor:'rgb(32,32,32)',marginTop:20}}></View>
    <View style={{flexDirection:'row',justifyContent:'space-between',padding:20}}>
      
      <TouchableOpacity onPress={()=>setSem('s1')} style={{backgroundColor:sem=="s1" ? 'rgb(136,136,136)' : 'rgb(32,32,32)',borderRadius:10,shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,}}>
      <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',color:'#fff',margin:10,}}>Semestre 1</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>setSem('s2')}  style={{backgroundColor:sem=="s2" ? 'rgb(136,136,136)' :'rgb(32,32,32)',borderRadius:10,shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,}}>
      <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',color:'#fff',margin:10}}>Semestre 2</Text>
      </TouchableOpacity>
    </View>
      </View>

{ sem=="s1" ?

      <View style={{width:370,alignSelf:'center'}}>
        <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',color:'rgb(136,136,136)',marginBottom:15}}>Semestre 1</Text>
        <Text>Présentation du semestre 1 composé de 5 UE (Unités d'Enseignement) axées autour de l'#accompagnement et du #conseil !
          Le #projet #tutoré et le #mémoire englobent une grande partie de l'enseignement au cours de ce semestre.
          L'objectif de ces 2 cas est de mettre en #pratique des #savoirs acquis pendant les cours à partir d’une #problématique.
        </Text>
        <TouchableOpacity onPress={()=>voirMatiere(num1)} style={{shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,height:39,backgroundColor:'#000',width:120,marginTop:25,borderRadius:10}}>
            <Text style={{color:'#fff',fontWeight:'900',textAlign:'center',marginTop:9}}>Continuer</Text>
        </TouchableOpacity>
      </View>
       :
      <View style={{width:370,alignSelf:'center'}}>
  <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',color:'rgb(136,136,136)',marginBottom:15}}>Semestre 2</Text>
  <Text>Présentation du semestre 2 composé de 5 UE (Unités d'Enseignement) axées autour de l'#accompagnement et du #conseil !
Le #projet #tutoré et le #mémoire englobent une grande partie de l'enseignement au cours de ce semestre.
L'objectif de ces 2 cas est de mettre en #pratique des #savoirs acquis pendant les cours à partir d’une #problématique.
  </Text>
  <TouchableOpacity onPress={()=>voirMatiere(num2)} style={{shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,height:39,backgroundColor:'#000',width:120,marginTop:25,borderRadius:10}}>
      <Text style={{color:'#fff',fontWeight:'900',textAlign:'center',marginTop:9}}>Continuer</Text>
  </TouchableOpacity>
      </View>
}
<View style={{height:1,width:WIDTH,backgroundColor:'rgb(32,32,32)',marginTop:25}}></View>

    </ScrollView>
  )
}

export default Semestre