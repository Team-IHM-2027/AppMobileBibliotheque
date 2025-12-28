import { View, Text, ScrollView, Image,ImageBackground,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const CoursInscrit4 = (props) => {
  const {dataTableMatiere,indChap,indPartieCours,test} = props.route.params 

 // console.log('COURS',partieDuCours,index)

  const voirQuizz = () => {
    props.navigation.navigate('Quizz',{
      dataTableMatiere:dataTableMatiere,
      indChap:indChap,
      indPartieCours:indPartieCours,
      test:test

    })    
  }

  const voirVideo = (vid)=>{
    props.navigation.navigate('VideoCours',{
      vid:vid
    })
  }

  const voirCoursInscrit = (dataTableMatiere,indChap,indPartieCours) => {
    props.navigation.navigate('CoursInscrit',{
      dataTableMatiere:dataTableMatiere,
      indChap:indChap,
      indPartieCours:indPartieCours
    })
  } 

 const partieDuCours = dataTableMatiere[indChap].cours[indPartieCours]
// console.log('coursInscrit',dataTableMatiere[indChap].cours.length,indChap,indPartieCours)
//console.log('coursInscrit',dataTableMatiere.length)
 // const chapSuivant = tableCours[index+1]

 



  return (
    <ScrollView style={{backgroundColor:'#fff'}}>


<TouchableOpacity style={{shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,width:50,marginLeft:20}} onPress={()=>props.navigation.goBack()}>
        <View style={{backgroundColor:'#000',padding:1,borderRadius:25,marginTop:15}}>
        <Text style={{fontSize:20,color:'#fff',textAlign:'center'}}>{'<<'}</Text>
        </View>
      </TouchableOpacity>

        <View style={{height:1,width:WIDTH,backgroundColor:'gray',marginTop:15}}></View>


        <View style={{margin:7,width:WIDTH*0.9,padding:20}}>
           <Text style={{color:'#000',fontWeight:'800',fontSize:17,textAlign:'center',fontFamily:'San Francisco'}}>{partieDuCours.titre}</Text>
        </View>
        <TouchableOpacity style={{height:200,width:350,alignSelf:'center',backgroundColor:'rgba(136,136,136,0.5)',borderRadius:20}}  onPress={()=>voirVideo(partieDuCours.lienVideo)}>
            <Image style={{height:60,width:60,borderRadius:35,alignSelf:'center',marginTop:70}} source={require('../../assets/playvideo.png')} />
        </TouchableOpacity>


      <View style={{width:WIDTH*0.9,margin:5,padding:20}}>
        <Text style={{fontFamily:'Roboto'}}>{partieDuCours.texte1}</Text>
      </View>

      <Image style={{height:200,width:WIDTH*0.7,alignSelf:'center',}} resizeMode='contain' source={{uri:partieDuCours.lienImage}} />

      <View style={{width:WIDTH*0.9,margin:5,padding:20}}>
        <Text style={{fontFamily:'Roboto'}}>{partieDuCours.texte2}</Text>
      </View>

      <View style={{justifyContent:'space-between',flexDirection:'row',marginBottom:20,width:WIDTH*0.9,margin:5}}>
        
        <TouchableOpacity onPress={()=>console.log(dataTableMatiere,indChap+1,0)} style={{marginTop:30,backgroundColor:'#191970'}}>
        </TouchableOpacity>
        {
            indPartieCours < dataTableMatiere[indChap].cours.length-1 ?
            (
            <TouchableOpacity onPress={()=>voirCoursInscrit(dataTableMatiere,indChap,indPartieCours+1)} style={{height:40,width:100,marginTop:30,backgroundColor:'rgba(136,136,136,0.9)',borderRadius:10}}>
                <Text style={{color:'#fff',fontWeight:'800',fontSize:17,textAlign:'center',marginTop:7}}>Continuer</Text>
            </TouchableOpacity>
            )
             :
                (
                <TouchableOpacity onPress={()=>voirQuizz(dataTableMatiere,indChap,0,test)} style={{height:40,width:100,marginTop:30,backgroundColor:'rgba(136,136,136,0.9)',borderRadius:10}}>
                    <Text style={{color:'#fff',fontWeight:'800',fontSize:17,textAlign:'center',marginTop:7}}>Quizz</Text>
                </TouchableOpacity>
                )
        }
        
      </View>
      
    </ScrollView>
  )
}


export default CoursInscrit4