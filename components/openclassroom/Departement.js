import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const WIDTH = Dimensions.get('window').width

import msp1 from '../../assets/fond/msp1.jpg'
import msp2 from '../../assets/fond/msp2.jpg'
import gi from '../../assets/image/gi.jpg'
import gc from '../../assets/fond/gc.jpg'
import gm from '../../assets/fond/gele.jpg'
import gtel from '../../assets/fond/gtel.jpg'
import gel from '../../assets/fond/gel.jpg'
import ahn from '../../assets/fond/ahn.jpg'


const Departement = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor:'#fff',width:WIDTH}}>
      <CadreDepartement video={"https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link"}  navigation={navigation} nom={"M S P 1"} img={msp1}  num={3} num1={31} num2={32} />
      <CadreDepartement video={"https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link"}  navigation={navigation} nom={"M S P 2"} img={msp2}  num={3} num1={31} num2={32} />
      <CadreDepartement video={"https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link"} navigation={navigation} nom={"Genie Informatique"} img={gi} num={3} num1={31} num2={32} />
      <CadreDepartement video={"https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link"}  navigation={navigation} nom={"Genie Civile"} img={gc}  num={3} num1={31} num2={32} />
      <CadreDepartement video={"https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link"}  navigation={navigation} nom={"Genie Mecanique"} img={gm}  num={3} num1={31} num2={32} />
      <CadreDepartement video={"https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link"}  navigation={navigation} nom={"Genie Electrique"} img={gel} num={3} num1={31} num2={32} />
      <CadreDepartement video={"https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link"}  navigation={navigation} nom={"Genie Telecom"} img={gtel}  num={3} num1={31} num2={32} />
      <CadreDepartement video={"https://drive.google.com/file/d/1A0oXljhaA2xMMNnhTb_YR3YCm_7czpE6/view?usp=share_link"}  navigation={navigation} nom={"A H N"} img={ahn}  num={3} num1={31} num2={32} />
     
    </ScrollView>
  )
}


const CadreDepartement = ({navigation,nom,img,num,num1,num2,video}) =>{

  const voirMatiere = (nom,img)=>{
    navigation.navigate('Semestre',{
      nom:nom,
      img:img,
      num:num,
      num1:num1,
      num2:num2,
      video:video
    })
  }

    return(
        <TouchableOpacity onPress={()=>voirMatiere(nom,img,num,num1,num2,video)} style={{flexDirection:'row',margin:7}}>
        
      <Image style={{height:90,width:90}} source={img} /> 
      {/* <View style={{height:90,width:90,borderRadius:30,backgroundColor:'#000'}}>
        <Text style={{alignSelf:'center',marginTop:35,fontFamily:'Georgia',fontWeight:'800',color:'#fff'}}>{nom}</Text>
    </View> */}


        <View>
        <View style={{width:300}}>
            <Text style={{margin:4,fontWeight:'800',color:'#000',fontFamily:'San Francisco',fontSize:17}}>{nom}</Text>
            <Text style={{flexWrap:'wrap',color:'#000',margin:4,fontSize:10}}>decouvrez toutes les notions qui feront de vous le meilleur ingenieur de tous les temps</Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Image style={{height:30,width:30,borderRadius:30,marginLeft:4}} source={require('../../assets/image/barre.jpg')} />
            <Text style={{marginLeft:5,marginTop:7,color:'#000'}}>Difficile</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
}


export default Departement