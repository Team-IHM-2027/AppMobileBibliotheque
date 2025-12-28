import { View, Text, ScrollView,TouchableOpacity, Dimensions, Image,StyleSheet,FlatList,Modal, SafeAreaView } from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import Checkbox from 'expo-checkbox';

import { UserContext } from '../../components/navigation/NewNav'
import firebase from '../../config'
import { doc, updateDoc, arrayUnion, arrayRemove,serverTimestamp,Timestamp  } from "firebase/firestore";



const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

var tabCorrection = ["a","b","c","d","a"]
var tabReponse =[0]
var tabCoche=[[false,false,false,false,],[false,false,false,false,],[false,false,false,false,],[false,false,false,false,]]
const tabCocheB=[true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
var note = 0, notefinal= 0
// const architest = "architest"


const Quizz = (props) => {

  const {dataTableMatiere,indChap,indPartieCours,test} = props.route.params 

  const [tabCorrectionQuizz,settabCorrectionQuizz] = useState(dataTableMatiere[indChap].correctionQuizz2)

 // const teste = test[indChap]
 //   console.log("tabCorrectionQuizz",tabCorrectionQuizz)
  const {currentUser,currentUserNewNav}= useContext(UserContext)
  const [datd, setDatd] = useState()
  const [mes, setMes]= useState()

  function subscribed (){ firebase.firestore()
    .collection('BiblioUser')
    .doc(currentUserNewNav.email)
    .onSnapshot(doc => {
     const items = []
     
     items.push(doc.data())
   
     setDatd(doc.data())
     setMes(doc.data().name)
   }
   )
    
   }
   
   useEffect(() =>{
     subscribed()
    },[])

    function subscriberINUTILE(){ firebase.firestore()  
      .collection('BiblioUser')
      .doc(currentUserNewNav.email) 
      .get()
      .then(  (documentSnapshot) => {reserver(documentSnapshot.data()) } );
    }
     
     //resaerver doc
     function reserver(dos){
      const ref = firebase.firestore().collection("BiblioUser")
    // console.log('currentUser.email dans BouleBiblio',cathegorie)
      const refDoc = firebase.firestore().collection('BiblioInformatique')

      ref
      .doc(dos.email) 
      .update({"architest1": notefinal})
      .catch((err)=>{
        console.log(err)  
      }) 
    }



 

  const [isChecked, setChecked] = React.useState(false);
  const [isCheckedA, setCheckedA] = React.useState(false);
  const [isCheckedB, setCheckedB] = React.useState(false);
  const [isCheckedC, setCheckedC] = React.useState(false);
  const [isCheckedD, setCheckedD] = React.useState(false);

  const [quizzTab, setQuizzTab]= React.useState(dataTableMatiere[indChap].quizz)

  const voirChapitreSuivant=()=>{
    setModalValidation(false)
    props.navigation.navigate('Cours',{})
  }

  const voirCoursInscrit = (dataTableMatiere,indChap,indPartieCours) => {
    props.navigation.navigate('CoursInscrit',{
      dataTableMatiere:dataTableMatiere,
      indChap:indChap,
      indPartieCours:indPartieCours
    })
  }

  const voirQuizz = () => {
    setModalValidation(!modalValidation)
    props.navigation.goBack()
      
  }

  const Fin = () => {
    setModalValidation(!modalValidation)
    props.navigation.navigate('Accueil')
      
  }


  const [modalValidation, setModalValidation] = React.useState(false)
  const validation =()=>{
   var i= 0
    for(i=0; i<tabReponse.length;i++){
      if(tabReponse[i]==tabCorrectionQuizz[i]){
        note++
      }
    }
    notefinal = note*20
    setModalValidation(!modalValidation) 
    subscriberINUTILE()

    
  }
  

  //GESTION DES REPONSES ET COCHES
//console.log(quizzTab[0])
 

  return (
    <ScrollView>

<TouchableOpacity style={{shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,width:50,marginLeft:20}} onPress={()=>props.navigation.goBack()}>
        <View style={{backgroundColor:'#000',padding:1,borderRadius:25,marginTop:15}}>
        <Text style={{fontSize:20,color:'#fff',textAlign:'center'}}>{'<<'}</Text>
        </View>
      </TouchableOpacity>

        <View style={{height:1,width:WIDTH,backgroundColor:'gray',marginTop:15}}></View>


        <Text style={{fontSize:23,fontWeight:'800',marginTop:20,marginLeft:10,color:'rgba(32,32,32,0.9)',textAlign:'center'}}>Competences évaluées</Text>

        <View style={{padding:25,paddingRight:30}}>
            <View style={{flexDirection:'row',marginTop:1,padding:1}}>
                <Image style={{height:35,width:35,borderRadius:35}} source={require('../../assets/image/ampoule.jpg')} />
                <Text style={{fontSize:17,}}>Comprendre les points communs et differences entre lasso et regression ridge Comprendre les points communs et differences entre lasso</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:17,padding:1}}>
                <Image style={{height:35,width:35,borderRadius:35}} source={require('../../assets/image/ampoule.jpg')} />
                <Text style={{fontSize:17,marginLeft:5}}>Comprendre les points communs et differences entre lasso et regression ridge Comprendre les points communs et differences entre lasso</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:17,padding:1}}>
                <Image style={{height:35,width:35,borderRadius:35}} source={require('../../assets/image/ampoule.jpg')} />
                <Text style={{fontSize:17,marginLeft:5}}>Comprendre les points communs et differences entre lasso et regression ridge Comprendre les points communs et differences entre lasso</Text>
            </View>
        </View>

        {/** QUESTION */}

        {
          dataTableMatiere[indChap].quizz.map((dev,index)=>{
            <React.Fragment key={index}>
            <View>

            <Text style={{fontSize:23,fontWeight:'800',marginTop:10,marginLeft:10,color:'rgba(32,32,32,0.9)'}}>Question {index}</Text>
    
            <View style={{height:1,width:WIDTH,backgroundColor:'gray'}}></View>

            <View>
                <Text style={{fontSize:23,fontWeight:'800',marginTop:10,marginLeft:10}}> {dev.question} </Text>
            </View>
    
          <View style={{margin:5,flexDirection:'row',marginRight:10}}>
            <Checkbox style={styles.checkbox} value={isCheckedA} onValueChange={setCheckedA} />
            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}> {dev.a}  </Text>
          </View>
    
          <View style={{margin:5,flexDirection:'row',marginRight:10}}>
            <Checkbox style={styles.checkbox} value={isCheckedA} onValueChange={setCheckedA} />
            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{dev.b}</Text>
          </View>
    
          <View style={{margin:5,flexDirection:'row',marginRight:10}}>
            <Checkbox style={styles.checkbox} value={isCheckedA} onValueChange={setCheckedA} />
            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}> {dev.c} </Text>
          </View>

          <View style={{margin:5,flexDirection:'row',marginRight:10}}>
            <Checkbox style={styles.checkbox} value={isCheckedA} onValueChange={setCheckedA} />
            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}> {dev.d} </Text>
          </View>
        </View>
  </React.Fragment>
          })
        }

{
   quizzTab.map((dev,index) =><Question key={index} num={index+1} a={dev.a} b={dev.b} c={dev.c}  d={dev.d} question={dev.question} />)
}
        
      
      

      <View style ={{height:200,backgroundColor:'rgba(136,136,136,0.5)',marginTop:50}}>

       
             <TouchableOpacity onPress={()=>validation()} style ={{height:50,backgroundColor:'rgba(32,32,32,0.9)',width:100,alignSelf:'center',marginTop:40,borderRadius:10}}>
             <Text style={{color:"#fff",alignSelf:'center',fontWeight:'700',fontSize:20,marginTop:12}}>Valider</Text>
            </TouchableOpacity>
            {/* 
           <View> 
              <TouchableOpacity style ={{height:50,backgroundColor:'lightskyblue',width:100,alignSelf:'center',marginTop:40}}>
                <Text style={{color:"#fff",alignSelf:'center',fontWeight:'700',fontSize:20,marginTop:12}}>Valider</Text>
              </TouchableOpacity>
              <Text style={{alignSelf:'center'}}>(repondez à toutes les questions)</Text>
            </View>
*/}
       
      {
        indChap != dataTableMatiere.length-1 ?
        (
        <TouchableOpacity onPress={()=>voirCoursInscrit(dataTableMatiere,indChap+1,0)} style ={{height:50,backgroundColor:'rgba(136,136,136,0.9)',alignSelf:'center',marginTop:59,width:WIDTH}}>
          <Text style={{color:"#fff",fontWeight:'700',fontSize:20,marginTop:12,marginLeft:145}}>Aller au chapitre suivant {">>"}</Text>
        </TouchableOpacity>
        ) :
        (
        <TouchableOpacity onPress={()=>Fin()} style ={{height:50,backgroundColor:'rgba(32,32,32,0.9)',alignSelf:'center',marginTop:59,width:WIDTH}}>
          <Text style={{color:"#fff",fontWeight:'700',fontSize:20,marginTop:12,alignSelf:'center'}}>FIN </Text>
        </TouchableOpacity>
        )
      }
       
      </View>

      <Modal animationType='slide'
         transparent={true}
         visible={modalValidation}
         onRequestClose={() => {
            setModalValidation(!modalValidation)
         }}
        >
          <SafeAreaView style={{backgroundColor:'#fff',height:HEIGHT,alignItems:'center',marginTop:100}}>
              <TouchableOpacity style={{marginTop:50}} onPress={()=>setModalValidation(!modalValidation)}>
                  <Text></Text>
              </TouchableOpacity>
              {
                notefinal >= 80 ? 
                <View>
                <Text style={{alignSelf:'center',fontSize:18, color:'green'}}>vous avez reussi avec {notefinal}%</Text>
              </View> :
               <View>
               <Text style={{alignSelf:'center',fontSize:18,color:"red"}}>vous avez {notefinal}%, il faut au moins 80% pour reussir.</Text>
              </View>
              }


              {
                notefinal<80 ?

             ( 
              indChap != dataTableMatiere.length-1 ?
            <View style={{justifyContent:'space-between',flexDirection:'column'}}>
              <TouchableOpacity onPress={()=>voirQuizz(dataTableMatiere,indChap,0)} style ={{height:50,backgroundColor:'rgba(136,136,136,0.9)',alignSelf:'center',borderRadius:10,padding:15,marginTop:40}}>
             <Text style={{color:"#fff",alignSelf:'center',fontWeight:'700',fontSize:20,}}>recommencer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>voirCoursInscrit(dataTableMatiere,indChap+1,0)} style ={{height:50,backgroundColor:'rgba(136,136,136,0.9)',alignSelf:'center',borderRadius:10,padding:15,marginTop:40}}>
             <Text style={{color:"#fff",alignSelf:'center',fontWeight:'700',fontSize:20,}}>aller au chap suivant</Text>
            </TouchableOpacity>
            </View> : 
            <View style={{justifyContent:'space-between',flexDirection:'column'}}>
            <TouchableOpacity onPress={()=>voirQuizz(dataTableMatiere,indChap,0)} style ={{height:50,backgroundColor:'rgba(136,136,136,0.9)',alignSelf:'center',borderRadius:10,padding:15,marginTop:40}}>
           <Text style={{color:"#fff",alignSelf:'center',fontWeight:'700',fontSize:20,}}>recommencer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Fin()} style ={{height:50,backgroundColor:'rgba(136,136,136,0.9)',alignSelf:'center',borderRadius:10,padding:15,marginTop:40}}>
           <Text style={{color:"#fff",alignSelf:'center',fontWeight:'700',fontSize:20,}}>Accueil</Text>
          </TouchableOpacity>
          </View>) :
            ( indChap != dataTableMatiere.length-1 ?
            <View>
            <TouchableOpacity onPress={()=>voirCoursInscrit(dataTableMatiere,indChap+1,0)} style ={{height:50,backgroundColor:'rgba(136,136,136,0.9)',alignSelf:'center',borderRadius:10,padding:15,marginTop:40}}>
            <Text style={{color:"#fff",alignSelf:'center',fontWeight:'700',fontSize:20,}}>aller au chap suivant</Text>
            </TouchableOpacity>
            </View> : 
            <TouchableOpacity onPress={()=>Fin()} style ={{height:50,backgroundColor:'rgba(136,136,136,0.9)',alignSelf:'center',borderRadius:10,padding:15,marginTop:40}}>
           <Text style={{color:"#fff",alignSelf:'center',fontWeight:'700',fontSize:20,}}>Accueil</Text>
          </TouchableOpacity>)
          }  
          </SafeAreaView>

        </Modal>
      
    </ScrollView>
  )
}

const Question = ({num,question,a,b,c,d,e}) => {

    const [isChecked, setChecked] = React.useState(false);

    const indA = parseInt(num+"0")
    const indB = parseInt(num+"1")
    const indC = parseInt(num+"2")
    const indD = parseInt(num+"3")
    const [a1, seta1]= React.useState(false) , [b1, setb1]= React.useState(false) , [c1, setc1]= React.useState(false) , [d1, setd1]= React.useState(false)
    const [a2, seta2]= React.useState(false) , [b2, setb2]= React.useState(false) , [c2, setc2]= React.useState(false) , [d2, setd2]= React.useState(false)
    const [a3, seta3]= React.useState(false) , [b3, setb3]= React.useState(false) , [c3, setc3]= React.useState(false) , [d3, setd3]= React.useState(false)
    const [a4, seta4]= React.useState(false) , [b4, setb4]= React.useState(false) , [c4, setc4]= React.useState(false) , [d4, setd4]= React.useState(false)
    const [a5, seta5]= React.useState(false) , [b5, setb5]= React.useState(false) , [c5, setc5]= React.useState(false) , [d5, setd5]= React.useState(false)
    const [a6, seta6]= React.useState(false) , [b6, setb6]= React.useState(false) , [c6, setc6]= React.useState(false) , [d6, setd6]= React.useState(false)
    const [a7, seta7]= React.useState(false) , [b7, setb7]= React.useState(false) , [c7, setc7]= React.useState(false) , [d7, setd7]= React.useState(false)
    const [a8, seta8]= React.useState(false) , [b8, setb8]= React.useState(false) , [c8, setc8]= React.useState(false) , [d8, setd8]= React.useState(false)
    const [a9, seta9]= React.useState(false) , [b9, setb9]= React.useState(false) , [c9, setc9]= React.useState(false) , [d9, setd9]= React.useState(false)
    const [a10, seta10]= React.useState(false) , [b10, setb10]= React.useState(false) , [c10, setc10]= React.useState(false) , [d10, setd10]= React.useState(false)
    const [a11, seta11]= React.useState(false) , [b11, setb11]= React.useState(false) , [c11, setc11]= React.useState(false) , [d11, setd11]= React.useState(false)
    const [a12, seta12]= React.useState(false) , [b12, setb12]= React.useState(false) , [c12, setc12]= React.useState(false) , [d12, setd12]= React.useState(false)
    const [a13, seta13]= React.useState(false) , [b13, setb13]= React.useState(false) , [c13, setc13]= React.useState(false) , [d13, setd13]= React.useState(false)
    const [a14, seta14]= React.useState(false) , [b14, setb14]= React.useState(false) , [c14, setc14]= React.useState(false) , [d14, setd14]= React.useState(false)
    const [a15, seta15]= React.useState(false) , [b15, setb15]= React.useState(false) , [c15, setc15]= React.useState(false) , [d15, setd15]= React.useState(false)
    const [a16, seta16]= React.useState(false) , [b16, setb16]= React.useState(false) , [c16, setc16]= React.useState(false) , [d16, setd16]= React.useState(false)
    const [a17, seta17]= React.useState(false) , [b17, setb17]= React.useState(false) , [c17, setc17]= React.useState(false) , [d17, setd17]= React.useState(false)
    const [a18, seta18]= React.useState(false) , [b18, setb18]= React.useState(false) , [c18, setc18]= React.useState(false) , [d18, setd18]= React.useState(false)
    const [a19, seta19]= React.useState(false) , [b19, setb19]= React.useState(false) , [c19, setc19]= React.useState(false) , [d19, setd19]= React.useState(false)
    const [a20, seta20]= React.useState(false) , [b20, setb20]= React.useState(false) , [c20, setc20]= React.useState(false) , [d20, setd20]= React.useState(false)
    const [a21, seta21]= React.useState(false) , [b21, setb21]= React.useState(false) , [c21, setc21]= React.useState(false) , [d21, setd21]= React.useState(false)
    const [a22, seta22]= React.useState(false) , [b22, setb22]= React.useState(false) , [c22, setc22]= React.useState(false) , [d22, setd22]= React.useState(false)
    const [a23, seta23]= React.useState(false) , [b23, setb23]= React.useState(false) , [c23, setc23]= React.useState(false) , [d23, setd23]= React.useState(false)
    const [a24, seta24]= React.useState(false) , [b24, setb24]= React.useState(false) , [c24, setc24]= React.useState(false) , [d24, setd24]= React.useState(false)
    const [a25, seta25]= React.useState(false) , [b25, setb25]= React.useState(false) , [c25, setc25]= React.useState(false) , [d25, setd25]= React.useState(false)
    const [a26, seta26]= React.useState(false) , [b26, setb26]= React.useState(false) , [c26, setc26]= React.useState(false) , [d26, setd26]= React.useState(false)
    const [a27, seta27]= React.useState(false) , [b27, setb27]= React.useState(false) , [c27, setc27]= React.useState(false) , [d27, setd27]= React.useState(false)
    const [a28, seta28]= React.useState(false) , [b28, setb28]= React.useState(false) , [c28, setc28]= React.useState(false) , [d28, setd28]= React.useState(false)
    const [a29, seta29]= React.useState(false) , [b29, setb29]= React.useState(false) , [c29, setc29]= React.useState(false) , [d29, setd29]= React.useState(false)
    const [a30, seta30]= React.useState(false) , [b30, setb30]= React.useState(false) , [c30, setc30]= React.useState(false) , [d30, setd30]= React.useState(false)
    const [a31, seta31]= React.useState(false) , [b31, setb31]= React.useState(false) , [c31, setc31]= React.useState(false) , [d31, setd31]= React.useState(false)
    const [a32, seta32]= React.useState(false) , [b32, setb32]= React.useState(false) , [c32, setc32]= React.useState(false) , [d32, setd32]= React.useState(false)
    const [a33, seta33]= React.useState(false) , [b33, setb33]= React.useState(false) , [c33, setc33]= React.useState(false) , [d33, setd33]= React.useState(false)
    const [a34, seta34]= React.useState(false) , [b34, setb34]= React.useState(false) , [c34, setc34]= React.useState(false) , [d34, setd34]= React.useState(false)
    const [a35, seta35]= React.useState(false) , [b35, setb35]= React.useState(false) , [c35, setc35]= React.useState(false) , [d35, setd35]= React.useState(false)
    const [a36, seta36]= React.useState(false) , [b36, setb36]= React.useState(false) , [c36, setc36]= React.useState(false) , [d36, setd36]= React.useState(false)
    const [a37, seta37]= React.useState(false) , [b37, setb37]= React.useState(false) , [c37, setc37]= React.useState(false) , [d37, setd37]= React.useState(false)
    const [a38, seta38]= React.useState(false) , [b38, setb38]= React.useState(false) , [c38, setc38]= React.useState(false) , [d38, setd38]= React.useState(false)
    const [a39, seta39]= React.useState(false) , [b39, setb39]= React.useState(false) , [c39, setc39]= React.useState(false) , [d39, setd39]= React.useState(false)
    const [a40, seta40]= React.useState(false) , [b40, setb40]= React.useState(false) , [c40, setc40]= React.useState(false) , [d40, setd40]= React.useState(false)
    const [a41, seta41]= React.useState(false) , [b41, setb41]= React.useState(false) , [c41, setc41]= React.useState(false) , [d41, setd41]= React.useState(false)
    const [a42, seta42]= React.useState(false) , [b42, setb42]= React.useState(false) , [c42, setc42]= React.useState(false) , [d42, setd42]= React.useState(false)
    const [a43, seta43]= React.useState(false) , [b43, setb43]= React.useState(false) , [c43, setc43]= React.useState(false) , [d43, setd43]= React.useState(false)
    const [a44, seta44]= React.useState(false) , [b44, setb44]= React.useState(false) , [c44, setc44]= React.useState(false) , [d44, setd44]= React.useState(false)
    const [a45, seta45]= React.useState(false) , [b45, setb45]= React.useState(false) , [c45, setc45]= React.useState(false) , [d45, setd45]= React.useState(false)
    const [a46, seta46]= React.useState(false) , [b46, setb46]= React.useState(false) , [c46, setc46]= React.useState(false) , [d46, setd46]= React.useState(false)
    const [a47, seta47]= React.useState(false) , [b47, setb47]= React.useState(false) , [c47, setc47]= React.useState(false) , [d47, setd47]= React.useState(false)
    const [a48, seta48]= React.useState(false) , [b48, setb48]= React.useState(false) , [c48, setc48]= React.useState(false) , [d48, setd48]= React.useState(false)
    const [a49, seta49]= React.useState(false) , [b49, setb49]= React.useState(false) , [c49, setc49]= React.useState(false) , [d49, setd49]= React.useState(false)
    const [a50, seta50]= React.useState(false) , [b50, setb50]= React.useState(false) , [c50, setc50]= React.useState(false) , [d50, setd50]= React.useState(false)
   
    const ajoutReponse= (mot,num)=>{
    const reponse = mot
    const ind = num-1
    const indA = parseInt(num+"0")
    const indB = parseInt(num+"1")
    const indC = parseInt(num+"2")
    const indD = parseInt(num+"3")
    // tabCocheB.splice(0, 0, true)
    if(num==1){
      if(mot=="a"){
     tabCocheB.splice(indA, 1, "true")
     tabCocheB.splice(indB, 1, false)
     tabCocheB.splice(indC, 1, false)
     tabCocheB.splice(indD, 1, false)
     seta1(true)
     setb1(false)
     setc1(false)
     setd1(false)
     tabReponse.splice(ind, 1, "a")
        console.log(tabReponse)
      }
      if(mot=="b"){
        tabCocheB.splice(indA, 1, false)
        tabCocheB.splice(indB, 1, true)
        tabCocheB.splice(indC, 1, false)
        tabCocheB.splice(indD, 1, false)
        seta1(false)
        setb1(true)
        setc1(false)
        setd1(false)
        tabReponse.splice(ind, 1, "b")
        console.log(tabReponse)

         }
         if(mot=="c"){
          tabCocheB.splice(indA, 1, false)
          tabCocheB.splice(indB, 1, false)
          tabCocheB.splice(indC, 1, true)
          tabCocheB.splice(indD, 1, false)
          seta1(false)
          setb1(false)
          setc1(true)
          setd1(false)
          tabReponse.splice(ind, 1, "c")

           }
           if(mot=="d"){
            tabCocheB.splice(indA, 1, false)
            tabCocheB.splice(indB, 1, false)
            tabCocheB.splice(indC, 1, false)
            tabCocheB.splice(indD, 1, true)
            seta1(false)
            setb1(false)
            setc1(false)
            setd1(true)
            tabReponse.splice(ind, 1, "d")

             }
            }

            if(num==2){
              if(mot=="a"){
             tabCocheB.splice(indA, 1, "true")
             tabCocheB.splice(indB, 1, false)
             tabCocheB.splice(indC, 1, false)
             tabCocheB.splice(indD, 1, false)
             seta2(true)
             setb2(false)
             setc2(false)
             setd2(false)
     tabReponse.splice(ind, 1, "a")

              }
              if(mot=="b"){
                tabCocheB.splice(indA, 1, false)
                tabCocheB.splice(indB, 1, true)
                tabCocheB.splice(indC, 1, false)
                tabCocheB.splice(indD, 1, false)
                seta2(false)
                setb2(true)
                setc2(false)
                setd2(false)
     tabReponse.splice(ind, 0, "b")

                 }
                 if(mot=="c"){
                  tabCocheB.splice(indA, 1, false)
                  tabCocheB.splice(indB, 1, false)
                  tabCocheB.splice(indC, 1, true)
                  tabCocheB.splice(indD, 1, false)
                  seta2(false)
                  setb2(false)
                  setc2(true)
                  setd2(false)
     tabReponse.splice(ind, 1, "c")

                   }
                   if(mot=="d"){
                    tabCocheB.splice(indA, 1, false)
                    tabCocheB.splice(indB, 1, false)
                    tabCocheB.splice(indC, 1, false)
                    tabCocheB.splice(indD, 1, true)
                    seta2(false)
                    setb2(false)
                    setc2(false)
                    setd2(true)
     tabReponse.splice(ind, 1, "d")

                     }
                    }

                    if(num==3){
                      if(mot=="a"){
                     tabCocheB.splice(indA, 1, "true")
                     tabCocheB.splice(indB, 1, false)
                     tabCocheB.splice(indC, 1, false)
                     tabCocheB.splice(indD, 1, false)
                     seta3(true)
                     setb3(false)
                     setc3(false)
                     setd3(false)
     tabReponse.splice(ind, 1, "a")

                      }
                      if(mot=="b"){
                        tabCocheB.splice(indA, 1, false)
                        tabCocheB.splice(indB, 1, true)
                        tabCocheB.splice(indC, 1, false)
                        tabCocheB.splice(indD, 1, false)
                        seta3(false)
                        setb3(true)
                        setc3(false)
                        setd3(false)
     tabReponse.splice(ind, 1, "b")

                         }
                         if(mot=="c"){
                          tabCocheB.splice(indA, 1, false)
                          tabCocheB.splice(indB, 1, false)
                          tabCocheB.splice(indC,1, true)
                          tabCocheB.splice(indD, 1, false)
                          seta3(false)
                          setb3(false)
                          setc3(true)
                          setd3(false)
     tabReponse.splice(ind, 1, "c")

                           }
                           if(mot=="d"){
                            tabCocheB.splice(indA, 1, false)
                            tabCocheB.splice(indB, 1, false)
                            tabCocheB.splice(indC, 1, false)
                            tabCocheB.splice(indD, 1, true)
                            seta3(false)
                            setb3(false)
                            setc3(false)
                            setd3(true)
     tabReponse.splice(ind, 1, "d")

                             }
                            }
                            if(num==4){
                              if(mot=="a"){
                             tabCocheB.splice(indA, 1, "true")
                             tabCocheB.splice(indB, 1, false)
                             tabCocheB.splice(indC, 1, false)
                             tabCocheB.splice(indD, 1, false)
                             seta4(true)
                             setb4(false)
                             setc4(false)
                             setd4(false)
     tabReponse.splice(ind, 1, "a")

                              }
                              if(mot=="b"){
                                tabCocheB.splice(indA, 1, false)
                                tabCocheB.splice(indB, 1, true)
                                tabCocheB.splice(indC, 1, false)
                                tabCocheB.splice(indD, 1, false)
                                seta4(false)
                                setb4(true)
                                setc4(false)
                                setd4(false)
     tabReponse.splice(ind, 1, "b")

                                 }
                                 if(mot=="c"){
                                  tabCocheB.splice(indA, 1, false)
                                  tabCocheB.splice(indB, 1, false)
                                  tabCocheB.splice(indC, 1, true)
                                  tabCocheB.splice(indD, 1, false)
                                  seta4(false)
                                  setb4(false)
                                  setc4(true)
                                  setd4(false)
     tabReponse.splice(ind, 1, "c")

                                   }
                                   if(mot=="d"){
                                    tabCocheB.splice(indA, 1, false)
                                    tabCocheB.splice(indB, 1, false)
                                    tabCocheB.splice(indC, 1, false)
                                    tabCocheB.splice(indD, 1, true)
                                    seta4(false)
                                    setb4(false)
                                    setc4(false)
                                    setd4(true)
     tabReponse.splice(ind, 1, "d")

                                     }
                                    }
                                    if(num==5){
                                      if(mot=="a"){
                                     tabCocheB.splice(indA, 1, "true")
                                     tabCocheB.splice(indB, 1, false)
                                     tabCocheB.splice(indC, 1, false)
                                     tabCocheB.splice(indD, 1, false)
                                     seta5(true)
                                     setb5(false)
                                     setc5(false)
                                     setd5(false)
     tabReponse.splice(ind, 1, "a")

                                      }
                                      if(mot=="b"){
                                        tabCocheB.splice(indA, 1, false)
                                        tabCocheB.splice(indB, 1, true)
                                        tabCocheB.splice(indC, 1, false)
                                        tabCocheB.splice(indD, 1, false)
                                        seta5(false)
                                        setb5(true)
                                        setc5(false)
                                        setd5(false)
     tabReponse.splice(ind, 1, "b")

                                         }
                                         if(mot=="c"){
                                          tabCocheB.splice(indA, 1, false)
                                          tabCocheB.splice(indB, 1, false)
                                          tabCocheB.splice(indC, 1, true)
                                          tabCocheB.splice(indD, 1, false)
                                          seta5(false)
                                          setb5(false)
                                          setc5(true)
                                          setd5(false)
     tabReponse.splice(ind, 1, "c")

                                           }
                                           if(mot=="d"){
                                            tabCocheB.splice(indA, 1, false)
                                            tabCocheB.splice(indB, 1, false)
                                            tabCocheB.splice(indC, 1, false)
                                            tabCocheB.splice(indD, 1, true)
                                            seta5(false)
                                            setb5(false)
                                            setc5(false)
                                            setd5(true)
     tabReponse.splice(ind, 1, "d")

                                             }
                                            }
                                            if(num==6){
                                              if(mot=="a"){
                                             tabCocheB.splice(indA, 1, "true")
                                             tabCocheB.splice(indB, 1, false)
                                             tabCocheB.splice(indC, 1, false)
                                             tabCocheB.splice(indD, 1, false)
                                             seta6(true)
                                             setb6(false)
                                             setc6(false)
                                             setd6(false)
             tabReponse.splice(ind, 1, "a")
        
                                              }
                                              if(mot=="b"){
                                                tabCocheB.splice(indA, 1, false)
                                                tabCocheB.splice(indB, 1, true)
                                                tabCocheB.splice(indC, 1, false)
                                                tabCocheB.splice(indD, 1, false)
                                                seta6(false)
                                                setb6(true)
                                                setc6(false)
                                                setd6(false)
             tabReponse.splice(ind, 1, "b")
        
                                                 }
                                                 if(mot=="c"){
                                                  tabCocheB.splice(indA, 1, false)
                                                  tabCocheB.splice(indB, 1, false)
                                                  tabCocheB.splice(indC, 1, true)
                                                  tabCocheB.splice(indD, 1, false)
                                                  seta6(false)
                                                  setb6(false)
                                                  setc6(true)
                                                  setd6(false)
             tabReponse.splice(ind, 1, "c")
        
                                                   }
                                                   if(mot=="d"){
                                                    tabCocheB.splice(indA, 1, false)
                                                    tabCocheB.splice(indB, 1, false)
                                                    tabCocheB.splice(indC, 1, false)
                                                    tabCocheB.splice(indD, 1, true)
                                                    seta6(false)
                                                    setb6(false)
                                                    setc6(false)
                                                    setd6(true)
             tabReponse.splice(ind, 1, "d")
        
                                                     }
                                                    }
                                                    if(num==7){
                                                      if(mot=="a"){
                                                     tabCocheB.splice(indA, 1, "true")
                                                     tabCocheB.splice(indB, 1, false)
                                                     tabCocheB.splice(indC, 1, false)
                                                     tabCocheB.splice(indD, 1, false)
                                                     seta7(true)
                                                     setb7(false)
                                                     setc7(false)
                                                     setd7(false)
                     tabReponse.splice(ind, 1, "a")
                
                                                      }
                                                      if(mot=="b"){
                                                        tabCocheB.splice(indA, 1, false)
                                                        tabCocheB.splice(indB, 1, true)
                                                        tabCocheB.splice(indC, 1, false)
                                                        tabCocheB.splice(indD, 1, false)
                                                        seta7(false)
                                                        setb7(true)
                                                        setc7(false)
                                                        setd7(false)
                     tabReponse.splice(ind, 1, "b")
                
                                                         }
                                                         if(mot=="c"){
                                                          tabCocheB.splice(indA, 1, false)
                                                          tabCocheB.splice(indB, 1, false)
                                                          tabCocheB.splice(indC, 1, true)
                                                          tabCocheB.splice(indD, 1, false)
                                                          seta7(false)
                                                          setb7(false)
                                                          setc7(true)
                                                          setd7(false)
                     tabReponse.splice(ind, 1, "c")
                
                                                           }
                                                           if(mot=="d"){
                                                            tabCocheB.splice(indA, 1, false)
                                                            tabCocheB.splice(indB, 1, false)
                                                            tabCocheB.splice(indC, 1, false)
                                                            tabCocheB.splice(indD, 1, true)
                                                            seta7(false)
                                                            setb7(false)
                                                            setc7(false)
                                                            setd7(true)
                     tabReponse.splice(ind, 1, "d")
                
                                                             }
                                                            }
                                                            if(num==8){
                                                              if(mot=="a"){
                                                             tabCocheB.splice(indA, 1, "true")
                                                             tabCocheB.splice(indB, 1, false)
                                                             tabCocheB.splice(indC, 1, false)
                                                             tabCocheB.splice(indD, 1, false)
                                                             seta8(true)
                                                             setb8(false)
                                                             setc8(false)
                                                             setd8(false)
                             tabReponse.splice(ind, 1, "a")
                        
                                                              }
                                                              if(mot=="b"){
                                                                tabCocheB.splice(indA, 1, false)
                                                                tabCocheB.splice(indB, 1, true)
                                                                tabCocheB.splice(indC, 1, false)
                                                                tabCocheB.splice(indD, 1, false)
                                                                seta8(false)
                                                                setb8(true)
                                                                setc8(false)
                                                                setd8(false)
                             tabReponse.splice(ind, 1, "b")
                        
                                                                 }
                                                                 if(mot=="c"){
                                                                  tabCocheB.splice(indA, 1, false)
                                                                  tabCocheB.splice(indB, 1, false)
                                                                  tabCocheB.splice(indC, 1, true)
                                                                  tabCocheB.splice(indD, 1, false)
                                                                  seta8(false)
                                                                  setb8(false)
                                                                  setc8(true)
                                                                  setd8(false)
                             tabReponse.splice(ind, 1, "c")
                        
                                                                   }
                                                                   if(mot=="d"){
                                                                    tabCocheB.splice(indA, 1, false)
                                                                    tabCocheB.splice(indB, 1, false)
                                                                    tabCocheB.splice(indC, 1, false)
                                                                    tabCocheB.splice(indD, 1, true)
                                                                    seta8(false)
                                                                    setb8(false)
                                                                    setc8(false)
                                                                    setd8(true)
                             tabReponse.splice(ind, 1, "d")
                        
                                                                     }
                                                                    }
                                                                    if(num==9){
                                                                      if(mot=="a"){
                                                                     tabCocheB.splice(indA, 1, "true")
                                                                     tabCocheB.splice(indB, 1, false)
                                                                     tabCocheB.splice(indC, 1, false)
                                                                     tabCocheB.splice(indD, 1, false)
                                                                     seta9(true)
                                                                     setb9(false)
                                                                     setc9(false)
                                                                     setd9(false)
                                     tabReponse.splice(ind, 1, "a")
                                
                                                                      }
                                                                      if(mot=="b"){
                                                                        tabCocheB.splice(indA, 1, false)
                                                                        tabCocheB.splice(indB, 1, true)
                                                                        tabCocheB.splice(indC, 1, false)
                                                                        tabCocheB.splice(indD, 1, false)
                                                                        seta9(false)
                                                                        setb9(true)
                                                                        setc9(false)
                                                                        setd9(false)
                                     tabReponse.splice(ind, 1, "b")
                                
                                                                         }
                                                                         if(mot=="c"){
                                                                          tabCocheB.splice(indA, 1, false)
                                                                          tabCocheB.splice(indB, 1, false)
                                                                          tabCocheB.splice(indC, 1, true)
                                                                          tabCocheB.splice(indD, 1, false)
                                                                          seta9(false)
                                                                          setb9(false)
                                                                          setc9(true)
                                                                          setd9(false)
                                     tabReponse.splice(ind, 1, "c")
                                
                                                                           }
                                                                           if(mot=="d"){
                                                                            tabCocheB.splice(indA, 1, false)
                                                                            tabCocheB.splice(indB, 1, false)
                                                                            tabCocheB.splice(indC, 1, false)
                                                                            tabCocheB.splice(indD, 1, true)
                                                                            seta9(false)
                                                                            setb9(false)
                                                                            setc9(false)
                                                                            setd9(true)
                                     tabReponse.splice(ind, 1, "d")
                                
                                                                             }
                                                                            }
                                                                            if(num==10){
                                                                              if(mot=="a"){
                                                                             tabCocheB.splice(indA, 1, "true")
                                                                             tabCocheB.splice(indB, 1, false)
                                                                             tabCocheB.splice(indC, 1, false)
                                                                             tabCocheB.splice(indD, 1, false)
                                                                             seta10(true)
                                                                             setb10(false)
                                                                             setc10(false)
                                                                             setd10(false)
                                             tabReponse.splice(ind, 1, "a")
                                        
                                                                              }
                                                                              if(mot=="b"){
                                                                                tabCocheB.splice(indA, 1, false)
                                                                                tabCocheB.splice(indB, 1, true)
                                                                                tabCocheB.splice(indC, 1, false)
                                                                                tabCocheB.splice(indD, 1, false)
                                                                                seta10(false)
                                                                                setb10(true)
                                                                                setc10(false)
                                                                                setd10(false)
                                             tabReponse.splice(ind, 1, "b")
                                        
                                                                                 }
                                                                                 if(mot=="c"){
                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                  seta10(false)
                                                                                  setb10(false)
                                                                                  setc10(true)
                                                                                  setd10(false)
                                             tabReponse.splice(ind, 1, "c")
                                        
                                                                                   }
                                                                                   if(mot=="d"){
                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                    seta10(false)
                                                                                    setb10(false)
                                                                                    setc10(false)
                                                                                    setd10(true)
                                             tabReponse.splice(ind, 1, "d")
                                        
                                                                                     }
                                                                                    }
                                                                                    if(num==11){
                                                                                      if(mot=="a"){
                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                     seta11(true)
                                                                                     setb11(false)
                                                                                     setc11(false)
                                                                                     setd11(false)
                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                        console.log(tabReponse)
                                                                                      }
                                                                                      if(mot=="b"){
                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                        seta11(false)
                                                                                        setb11(true)
                                                                                        setc11(false)
                                                                                        setd11(false)
                                                                                        tabReponse.splice(ind, 1, "b")
                                                                                        console.log(tabReponse)
                                                                                
                                                                                         }
                                                                                         if(mot=="c"){
                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                          seta11(false)
                                                                                          setb11(false)
                                                                                          setc11(true)
                                                                                          setd11(false)
                                                                                          tabReponse.splice(ind, 1, "c")
                                                                                
                                                                                           }
                                                                                           if(mot=="d"){
                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                            seta11(false)
                                                                                            setb11(false)
                                                                                            setc11(false)
                                                                                            setd11(true)
                                                                                            tabReponse.splice(ind, 1, "d")
                                                                                
                                                                                             }
                                                                                            }
                                                                                
                                                                                            if(num==12){
                                                                                              if(mot=="a"){
                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                             seta12(true)
                                                                                             setb12(false)
                                                                                             setc12(false)
                                                                                             setd12(false)
                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                
                                                                                              }
                                                                                              if(mot=="b"){
                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                seta12(false)
                                                                                                setb12(true)
                                                                                                setc12(false)
                                                                                                setd12(false)
                                                                                     tabReponse.splice(ind, 0, "b")
                                                                                
                                                                                                 }
                                                                                                 if(mot=="c"){
                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                  seta12(false)
                                                                                                  setb12(false)
                                                                                                  setc12(true)
                                                                                                  setd12(false)
                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                
                                                                                                   }
                                                                                                   if(mot=="d"){
                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                    seta12(false)
                                                                                                    setb12(false)
                                                                                                    setc12(false)
                                                                                                    setd12(true)
                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                
                                                                                                     }
                                                                                                    }
                                                                                
                                                                                                    if(num==13){
                                                                                                      if(mot=="a"){
                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                     seta13(true)
                                                                                                     setb13(false)
                                                                                                     setc13(false)
                                                                                                     setd13(false)
                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                
                                                                                                      }
                                                                                                      if(mot=="b"){
                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                        seta13(false)
                                                                                                        setb13(true)
                                                                                                        setc13(false)
                                                                                                        setd13(false)
                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                
                                                                                                         }
                                                                                                         if(mot=="c"){
                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                          tabCocheB.splice(indC,1, true)
                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                          seta13(false)
                                                                                                          setb13(false)
                                                                                                          setc13(true)
                                                                                                          setd13(false)
                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                
                                                                                                           }
                                                                                                           if(mot=="d"){
                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                            seta13(false)
                                                                                                            setb13(false)
                                                                                                            setc13(false)
                                                                                                            setd13(true)
                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                
                                                                                                             }
                                                                                                            }
                                                                                                            if(num==14){
                                                                                                              if(mot=="a"){
                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                             seta14(true)
                                                                                                             setb14(false)
                                                                                                             setc14(false)
                                                                                                             setd14(false)
                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                
                                                                                                              }
                                                                                                              if(mot=="b"){
                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                seta14(false)
                                                                                                                setb14(true)
                                                                                                                setc14(false)
                                                                                                                setd14(false)
                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                
                                                                                                                 }
                                                                                                                 if(mot=="c"){
                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                  seta14(false)
                                                                                                                  setb14(false)
                                                                                                                  setc14(true)
                                                                                                                  setd14(false)
                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                
                                                                                                                   }
                                                                                                                   if(mot=="d"){
                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                    seta14(false)
                                                                                                                    setb14(false)
                                                                                                                    setc14(false)
                                                                                                                    setd14(true)
                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                
                                                                                                                     }
                                                                                                                    }
                                                                                                                    if(num==15){
                                                                                                                      if(mot=="a"){
                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                     seta15(true)
                                                                                                                     setb15(false)
                                                                                                                     setc15(false)
                                                                                                                     setd15(false)
                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                
                                                                                                                      }
                                                                                                                      if(mot=="b"){
                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                        seta15(false)
                                                                                                                        setb15(true)
                                                                                                                        setc15(false)
                                                                                                                        setd15(false)
                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                
                                                                                                                         }
                                                                                                                         if(mot=="c"){
                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                          seta15(false)
                                                                                                                          setb15(false)
                                                                                                                          setc15(true)
                                                                                                                          setd15(false)
                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                
                                                                                                                           }
                                                                                                                           if(mot=="d"){
                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                            seta15(false)
                                                                                                                            setb15(false)
                                                                                                                            setc15(false)
                                                                                                                            setd15(true)
                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                
                                                                                                                             }
                                                                                                                            }
                                                                                                                            if(num==16){
                                                                                                                              if(mot=="a"){
                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                             seta16(true)
                                                                                                                             setb16(false)
                                                                                                                             setc16(false)
                                                                                                                             setd16(false)
                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                        
                                                                                                                              }
                                                                                                                              if(mot=="b"){
                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                seta16(false)
                                                                                                                                setb16(true)
                                                                                                                                setc16(false)
                                                                                                                                setd16(false)
                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                        
                                                                                                                                 }
                                                                                                                                 if(mot=="c"){
                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                  seta16(false)
                                                                                                                                  setb16(false)
                                                                                                                                  setc16(true)
                                                                                                                                  setd16(false)
                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                        
                                                                                                                                   }
                                                                                                                                   if(mot=="d"){
                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                    seta16(false)
                                                                                                                                    setb16(false)
                                                                                                                                    setc16(false)
                                                                                                                                    setd16(true)
                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                        
                                                                                                                                     }
                                                                                                                                    }
                                                                                                                                    if(num==17){
                                                                                                                                      if(mot=="a"){
                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                     seta17(true)
                                                                                                                                     setb17(false)
                                                                                                                                     setc17(false)
                                                                                                                                     setd17(false)
                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                
                                                                                                                                      }
                                                                                                                                      if(mot=="b"){
                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                        seta17(false)
                                                                                                                                        setb17(true)
                                                                                                                                        setc17(false)
                                                                                                                                        setd17(false)
                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                
                                                                                                                                         }
                                                                                                                                         if(mot=="c"){
                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                          seta17(false)
                                                                                                                                          setb17(false)
                                                                                                                                          setc17(true)
                                                                                                                                          setd17(false)
                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                
                                                                                                                                           }
                                                                                                                                           if(mot=="d"){
                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                            seta17(false)
                                                                                                                                            setb17(false)
                                                                                                                                            setc17(false)
                                                                                                                                            setd17(true)
                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                
                                                                                                                                             }
                                                                                                                                            }
                                                                                                                                            if(num==18){
                                                                                                                                              if(mot=="a"){
                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                             seta18(true)
                                                                                                                                             setb18(false)
                                                                                                                                             setc18(false)
                                                                                                                                             setd18(false)
                                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                                        
                                                                                                                                              }
                                                                                                                                              if(mot=="b"){
                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                seta18(false)
                                                                                                                                                setb18(true)
                                                                                                                                                setc18(false)
                                                                                                                                                setd18(false)
                                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                                        
                                                                                                                                                 }
                                                                                                                                                 if(mot=="c"){
                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                  seta18(false)
                                                                                                                                                  setb18(false)
                                                                                                                                                  setc18(true)
                                                                                                                                                  setd18(false)
                                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                                        
                                                                                                                                                   }
                                                                                                                                                   if(mot=="d"){
                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                    seta18(false)
                                                                                                                                                    setb18(false)
                                                                                                                                                    setc18(false)
                                                                                                                                                    setd18(true)
                                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                                        
                                                                                                                                                     }
                                                                                                                                                    }
                                                                                                                                                    if(num==19){
                                                                                                                                                      if(mot=="a"){
                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                     seta19(true)
                                                                                                                                                     setb19(false)
                                                                                                                                                     setc19(false)
                                                                                                                                                     setd19(false)
                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                
                                                                                                                                                      }
                                                                                                                                                      if(mot=="b"){
                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                        seta19(false)
                                                                                                                                                        setb19(true)
                                                                                                                                                        setc19(false)
                                                                                                                                                        setd19(false)
                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                
                                                                                                                                                         }
                                                                                                                                                         if(mot=="c"){
                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                          seta19(false)
                                                                                                                                                          setb19(false)
                                                                                                                                                          setc19(true)
                                                                                                                                                          setd19(false)
                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                
                                                                                                                                                           }
                                                                                                                                                           if(mot=="d"){
                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                            seta19(false)
                                                                                                                                                            setb19(false)
                                                                                                                                                            setc19(false)
                                                                                                                                                            setd19(true)
                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                
                                                                                                                                                             }
                                                                                                                                                            }
                                                                                                                                                            if(num==20){
                                                                                                                                                              if(mot=="a"){
                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                             seta20(true)
                                                                                                                                                             setb20(false)
                                                                                                                                                             setc20(false)
                                                                                                                                                             setd20(false)
                                                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                                                        
                                                                                                                                                              }
                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                seta20(false)
                                                                                                                                                                setb20(true)
                                                                                                                                                                setc20(false)
                                                                                                                                                                setd20(false)
                                                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                                                        
                                                                                                                                                                 }
                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                  seta20(false)
                                                                                                                                                                  setb20(false)
                                                                                                                                                                  setc20(true)
                                                                                                                                                                  setd20(false)
                                                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                                                        
                                                                                                                                                                   }
                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                    seta20(false)
                                                                                                                                                                    setb20(false)
                                                                                                                                                                    setc20(false)
                                                                                                                                                                    setd20(true)
                                                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                                                        
                                                                                                                                                                     }
                                                                                                                                                                    }
                                                                                                                                                                    if(num==21){
                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                     seta21(true)
                                                                                                                                                                     setb21(false)
                                                                                                                                                                     setc21(false)
                                                                                                                                                                     setd21(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                        console.log(tabReponse)
                                                                                                                                                                      }
                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                        seta21(false)
                                                                                                                                                                        setb21(true)
                                                                                                                                                                        setc21(false)
                                                                                                                                                                        setd21(false)
                                                                                                                                                                        tabReponse.splice(ind, 1, "b")
                                                                                                                                                                        console.log(tabReponse)
                                                                                                                                                                
                                                                                                                                                                         }
                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                          seta21(false)
                                                                                                                                                                          setb21(false)
                                                                                                                                                                          setc21(true)
                                                                                                                                                                          setd21(false)
                                                                                                                                                                          tabReponse.splice(ind, 1, "c")
                                                                                                                                                                
                                                                                                                                                                           }
                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                            seta21(false)
                                                                                                                                                                            setb21(false)
                                                                                                                                                                            setc21(false)
                                                                                                                                                                            setd21(true)
                                                                                                                                                                            tabReponse.splice(ind, 1, "d")
                                                                                                                                                                
                                                                                                                                                                             }
                                                                                                                                                                            }
                                                                                                                                                                
                                                                                                                                                                            if(num==22){
                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                             seta22(true)
                                                                                                                                                                             setb22(false)
                                                                                                                                                                             setc22(false)
                                                                                                                                                                             setd22(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                
                                                                                                                                                                              }
                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                seta22(false)
                                                                                                                                                                                setb22(true)
                                                                                                                                                                                setc22(false)
                                                                                                                                                                                setd22(false)
                                                                                                                                                                     tabReponse.splice(ind, 0, "b")
                                                                                                                                                                
                                                                                                                                                                                 }
                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                  seta22(false)
                                                                                                                                                                                  setb22(false)
                                                                                                                                                                                  setc22(true)
                                                                                                                                                                                  setd22(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                
                                                                                                                                                                                   }
                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                    seta22(false)
                                                                                                                                                                                    setb22(false)
                                                                                                                                                                                    setc22(false)
                                                                                                                                                                                    setd22(true)
                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                
                                                                                                                                                                                     }
                                                                                                                                                                                    }
                                                                                                                                                                
                                                                                                                                                                                    if(num==23){
                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                     seta23(true)
                                                                                                                                                                                     setb23(false)
                                                                                                                                                                                     setc23(false)
                                                                                                                                                                                     setd23(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                
                                                                                                                                                                                      }
                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                        seta23(false)
                                                                                                                                                                                        setb23(true)
                                                                                                                                                                                        setc23(false)
                                                                                                                                                                                        setd23(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                
                                                                                                                                                                                         }
                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                          tabCocheB.splice(indC,1, true)
                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                          seta23(false)
                                                                                                                                                                                          setb23(false)
                                                                                                                                                                                          setc23(true)
                                                                                                                                                                                          setd23(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                
                                                                                                                                                                                           }
                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                            seta23(false)
                                                                                                                                                                                            setb23(false)
                                                                                                                                                                                            setc23(false)
                                                                                                                                                                                            setd23(true)
                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                
                                                                                                                                                                                             }
                                                                                                                                                                                            }
                                                                                                                                                                                            if(num==24){
                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                             seta24(true)
                                                                                                                                                                                             setb24(false)
                                                                                                                                                                                             setc24(false)
                                                                                                                                                                                             setd24(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                
                                                                                                                                                                                              }
                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                seta24(false)
                                                                                                                                                                                                setb24(true)
                                                                                                                                                                                                setc24(false)
                                                                                                                                                                                                setd24(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                
                                                                                                                                                                                                 }
                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                  seta24(false)
                                                                                                                                                                                                  setb24(false)
                                                                                                                                                                                                  setc24(true)
                                                                                                                                                                                                  setd24(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                
                                                                                                                                                                                                   }
                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                    seta24(false)
                                                                                                                                                                                                    setb24(false)
                                                                                                                                                                                                    setc24(false)
                                                                                                                                                                                                    setd24(true)
                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                
                                                                                                                                                                                                     }
                                                                                                                                                                                                    }
                                                                                                                                                                                                    if(num==25){
                                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                     seta25(true)
                                                                                                                                                                                                     setb25(false)
                                                                                                                                                                                                     setc25(false)
                                                                                                                                                                                                     setd25(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                
                                                                                                                                                                                                      }
                                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                        seta25(false)
                                                                                                                                                                                                        setb25(true)
                                                                                                                                                                                                        setc25(false)
                                                                                                                                                                                                        setd25(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                
                                                                                                                                                                                                         }
                                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                          seta25(false)
                                                                                                                                                                                                          setb25(false)
                                                                                                                                                                                                          setc25(true)
                                                                                                                                                                                                          setd25(false)
                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                
                                                                                                                                                                                                           }
                                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                            seta25(false)
                                                                                                                                                                                                            setb25(false)
                                                                                                                                                                                                            setc25(false)
                                                                                                                                                                                                            setd25(true)
                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                
                                                                                                                                                                                                             }
                                                                                                                                                                                                            }
                                                                                                                                                                                                            if(num==26){
                                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                             seta26(true)
                                                                                                                                                                                                             setb26(false)
                                                                                                                                                                                                             setc26(false)
                                                                                                                                                                                                             setd26(false)
                                                                                                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                                                                                                        
                                                                                                                                                                                                              }
                                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                seta26(false)
                                                                                                                                                                                                                setb26(true)
                                                                                                                                                                                                                setc26(false)
                                                                                                                                                                                                                setd26(false)
                                                                                                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                                                                                                        
                                                                                                                                                                                                                 }
                                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                  seta26(false)
                                                                                                                                                                                                                  setb26(false)
                                                                                                                                                                                                                  setc26(true)
                                                                                                                                                                                                                  setd26(false)
                                                                                                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                                                                                                        
                                                                                                                                                                                                                   }
                                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                    seta26(false)
                                                                                                                                                                                                                    setb26(false)
                                                                                                                                                                                                                    setc26(false)
                                                                                                                                                                                                                    setd26(true)
                                                                                                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                                                                                                        
                                                                                                                                                                                                                     }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    if(num==27){
                                                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                     seta27(true)
                                                                                                                                                                                                                     setb27(false)
                                                                                                                                                                                                                     setc27(false)
                                                                                                                                                                                                                     setd27(false)
                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                        seta27(false)
                                                                                                                                                                                                                        setb27(true)
                                                                                                                                                                                                                        setc27(false)
                                                                                                                                                                                                                        setd27(false)
                                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                
                                                                                                                                                                                                                         }
                                                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                          seta27(false)
                                                                                                                                                                                                                          setb27(false)
                                                                                                                                                                                                                          setc27(true)
                                                                                                                                                                                                                          setd27(false)
                                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                
                                                                                                                                                                                                                           }
                                                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                            seta27(false)
                                                                                                                                                                                                                            setb27(false)
                                                                                                                                                                                                                            setc27(false)
                                                                                                                                                                                                                            setd27(true)
                                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                
                                                                                                                                                                                                                             }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            if(num==28){
                                                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                             seta28(true)
                                                                                                                                                                                                                             setb28(false)
                                                                                                                                                                                                                             setc28(false)
                                                                                                                                                                                                                             setd28(false)
                                                                                                                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                        
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                seta28(false)
                                                                                                                                                                                                                                setb28(true)
                                                                                                                                                                                                                                setc28(false)
                                                                                                                                                                                                                                setd28(false)
                                                                                                                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                        
                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                  seta28(false)
                                                                                                                                                                                                                                  setb28(false)
                                                                                                                                                                                                                                  setc28(true)
                                                                                                                                                                                                                                  setd28(false)
                                                                                                                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                        
                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                    seta28(false)
                                                                                                                                                                                                                                    setb28(false)
                                                                                                                                                                                                                                    setc28(false)
                                                                                                                                                                                                                                    setd28(true)
                                                                                                                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                        
                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    if(num==29){
                                                                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                     seta29(true)
                                                                                                                                                                                                                                     setb29(false)
                                                                                                                                                                                                                                     setc29(false)
                                                                                                                                                                                                                                     setd29(false)
                                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                        seta29(false)
                                                                                                                                                                                                                                        setb29(true)
                                                                                                                                                                                                                                        setc29(false)
                                                                                                                                                                                                                                        setd29(false)
                                                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                
                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                          seta29(false)
                                                                                                                                                                                                                                          setb29(false)
                                                                                                                                                                                                                                          setc29(true)
                                                                                                                                                                                                                                          setd29(false)
                                                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                
                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                            seta29(false)
                                                                                                                                                                                                                                            setb29(false)
                                                                                                                                                                                                                                            setc29(false)
                                                                                                                                                                                                                                            setd29(true)
                                                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                
                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            if(num==30){
                                                                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                             seta30(true)
                                                                                                                                                                                                                                             setb30(false)
                                                                                                                                                                                                                                             setc30(false)
                                                                                                                                                                                                                                             setd30(false)
                                                                                                                                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                        
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                seta30(false)
                                                                                                                                                                                                                                                setb30(true)
                                                                                                                                                                                                                                                setc30(false)
                                                                                                                                                                                                                                                setd30(false)
                                                                                                                                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                        
                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                  seta30(false)
                                                                                                                                                                                                                                                  setb30(false)
                                                                                                                                                                                                                                                  setc30(true)
                                                                                                                                                                                                                                                  setd30(false)
                                                                                                                                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                        
                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                    seta30(false)
                                                                                                                                                                                                                                                    setb30(false)
                                                                                                                                                                                                                                                    setc30(false)
                                                                                                                                                                                                                                                    setd30(true)
                                                                                                                                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                        
                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                     if(num==41){
                                                                                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                     seta41(true)
                                                                                                                                                                                                                                                     setb41(false)
                                                                                                                                                                                                                                                     setc41(false)
                                                                                                                                                                                                                                                     setd41(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                        console.log(tabReponse)
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                        seta41(false)
                                                                                                                                                                                                                                                        setb41(true)
                                                                                                                                                                                                                                                        setc41(false)
                                                                                                                                                                                                                                                        setd41(false)
                                                                                                                                                                                                                                                        tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                        console.log(tabReponse)
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                          seta41(false)
                                                                                                                                                                                                                                                          setb41(false)
                                                                                                                                                                                                                                                          setc41(true)
                                                                                                                                                                                                                                                          setd41(false)
                                                                                                                                                                                                                                                          tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                            seta41(false)
                                                                                                                                                                                                                                                            setb41(false)
                                                                                                                                                                                                                                                            setc41(false)
                                                                                                                                                                                                                                                            setd41(true)
                                                                                                                                                                                                                                                            tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                            if(num==42){
                                                                                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                             seta42(true)
                                                                                                                                                                                                                                                             setb42(false)
                                                                                                                                                                                                                                                             setc42(false)
                                                                                                                                                                                                                                                             setd42(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                seta42(false)
                                                                                                                                                                                                                                                                setb42(true)
                                                                                                                                                                                                                                                                setc42(false)
                                                                                                                                                                                                                                                                setd42(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 0, "b")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                  seta42(false)
                                                                                                                                                                                                                                                                  setb42(false)
                                                                                                                                                                                                                                                                  setc42(true)
                                                                                                                                                                                                                                                                  setd42(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                    seta42(false)
                                                                                                                                                                                                                                                                    setb42(false)
                                                                                                                                                                                                                                                                    setc42(false)
                                                                                                                                                                                                                                                                    setd42(true)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                    if(num==43){
                                                                                                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                     seta43(true)
                                                                                                                                                                                                                                                                     setb43(false)
                                                                                                                                                                                                                                                                     setc43(false)
                                                                                                                                                                                                                                                                     setd43(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                        seta43(false)
                                                                                                                                                                                                                                                                        setb43(true)
                                                                                                                                                                                                                                                                        setc43(false)
                                                                                                                                                                                                                                                                        setd43(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                          tabCocheB.splice(indC,1, true)
                                                                                                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                          seta43(false)
                                                                                                                                                                                                                                                                          setb43(false)
                                                                                                                                                                                                                                                                          setc43(true)
                                                                                                                                                                                                                                                                          setd43(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                            seta43(false)
                                                                                                                                                                                                                                                                            setb43(false)
                                                                                                                                                                                                                                                                            setc43(false)
                                                                                                                                                                                                                                                                            setd43(true)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                            if(num==44){
                                                                                                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                             seta44(true)
                                                                                                                                                                                                                                                                             setb44(false)
                                                                                                                                                                                                                                                                             setc44(false)
                                                                                                                                                                                                                                                                             setd44(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                seta44(false)
                                                                                                                                                                                                                                                                                setb44(true)
                                                                                                                                                                                                                                                                                setc44(false)
                                                                                                                                                                                                                                                                                setd44(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                  seta44(false)
                                                                                                                                                                                                                                                                                  setb44(false)
                                                                                                                                                                                                                                                                                  setc44(true)
                                                                                                                                                                                                                                                                                  setd44(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                                    seta44(false)
                                                                                                                                                                                                                                                                                    setb44(false)
                                                                                                                                                                                                                                                                                    setc44(false)
                                                                                                                                                                                                                                                                                    setd44(true)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                    if(num==45){
                                                                                                                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                     seta45(true)
                                                                                                                                                                                                                                                                                     setb45(false)
                                                                                                                                                                                                                                                                                     setc45(false)
                                                                                                                                                                                                                                                                                     setd45(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                        seta45(false)
                                                                                                                                                                                                                                                                                        setb45(true)
                                                                                                                                                                                                                                                                                        setc45(false)
                                                                                                                                                                                                                                                                                        setd45(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                          seta45(false)
                                                                                                                                                                                                                                                                                          setb45(false)
                                                                                                                                                                                                                                                                                          setc45(true)
                                                                                                                                                                                                                                                                                          setd45(false)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                                            seta45(false)
                                                                                                                                                                                                                                                                                            setb45(false)
                                                                                                                                                                                                                                                                                            setc45(false)
                                                                                                                                                                                                                                                                                            setd45(true)
                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                            if(num==46){
                                                                                                                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                             seta46(true)
                                                                                                                                                                                                                                                                                             setb46(false)
                                                                                                                                                                                                                                                                                             setc46(false)
                                                                                                                                                                                                                                                                                             setd46(false)
                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                seta46(false)
                                                                                                                                                                                                                                                                                                setb46(true)
                                                                                                                                                                                                                                                                                                setc46(false)
                                                                                                                                                                                                                                                                                                setd46(false)
                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                  seta46(false)
                                                                                                                                                                                                                                                                                                  setb46(false)
                                                                                                                                                                                                                                                                                                  setc46(true)
                                                                                                                                                                                                                                                                                                  setd46(false)
                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                                                    seta46(false)
                                                                                                                                                                                                                                                                                                    setb46(false)
                                                                                                                                                                                                                                                                                                    setc46(false)
                                                                                                                                                                                                                                                                                                    setd46(true)
                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                    if(num==47){
                                                                                                                                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                     seta47(true)
                                                                                                                                                                                                                                                                                                     setb47(false)
                                                                                                                                                                                                                                                                                                     setc47(false)
                                                                                                                                                                                                                                                                                                     setd47(false)
                                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                        seta47(false)
                                                                                                                                                                                                                                                                                                        setb47(true)
                                                                                                                                                                                                                                                                                                        setc47(false)
                                                                                                                                                                                                                                                                                                        setd47(false)
                                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                          seta47(false)
                                                                                                                                                                                                                                                                                                          setb47(false)
                                                                                                                                                                                                                                                                                                          setc47(true)
                                                                                                                                                                                                                                                                                                          setd47(false)
                                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                                                            seta47(false)
                                                                                                                                                                                                                                                                                                            setb47(false)
                                                                                                                                                                                                                                                                                                            setc47(false)
                                                                                                                                                                                                                                                                                                            setd47(true)
                                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            if(num==48){
                                                                                                                                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                             seta48(true)
                                                                                                                                                                                                                                                                                                             setb48(false)
                                                                                                                                                                                                                                                                                                             setc48(false)
                                                                                                                                                                                                                                                                                                             setd48(false)
                                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                                seta48(false)
                                                                                                                                                                                                                                                                                                                setb48(true)
                                                                                                                                                                                                                                                                                                                setc48(false)
                                                                                                                                                                                                                                                                                                                setd48(false)
                                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                                  seta48(false)
                                                                                                                                                                                                                                                                                                                  setb48(false)
                                                                                                                                                                                                                                                                                                                  setc48(true)
                                                                                                                                                                                                                                                                                                                  setd48(false)
                                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                                                                    seta48(false)
                                                                                                                                                                                                                                                                                                                    setb48(false)
                                                                                                                                                                                                                                                                                                                    setc48(false)
                                                                                                                                                                                                                                                                                                                    setd48(true)
                                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                    if(num==49){
                                                                                                                                                                                                                                                                                                                      if(mot=="a"){
                                                                                                                                                                                                                                                                                                                     tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                                                                                     tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                                     tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                                     tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                                     seta49(true)
                                                                                                                                                                                                                                                                                                                     setb49(false)
                                                                                                                                                                                                                                                                                                                     setc49(false)
                                                                                                                                                                                                                                                                                                                     setd49(false)
                                                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                      if(mot=="b"){
                                                                                                                                                                                                                                                                                                                        tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                        tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                                                                        tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                                        tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                                        seta49(false)
                                                                                                                                                                                                                                                                                                                        setb49(true)
                                                                                                                                                                                                                                                                                                                        setc49(false)
                                                                                                                                                                                                                                                                                                                        setd49(false)
                                                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                                                                                                         if(mot=="c"){
                                                                                                                                                                                                                                                                                                                          tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                          tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                                          tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                                                                                          tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                                          seta49(false)
                                                                                                                                                                                                                                                                                                                          setb49(false)
                                                                                                                                                                                                                                                                                                                          setc49(true)
                                                                                                                                                                                                                                                                                                                          setd49(false)
                                                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                                                                                                           if(mot=="d"){
                                                                                                                                                                                                                                                                                                                            tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                            tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                                            tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                                            tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                                                                            seta49(false)
                                                                                                                                                                                                                                                                                                                            setb49(false)
                                                                                                                                                                                                                                                                                                                            setc49(false)
                                                                                                                                                                                                                                                                                                                            setd49(true)
                                                                                                                                                                                                                                                                                     tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                            if(num==50){
                                                                                                                                                                                                                                                                                                                              if(mot=="a"){
                                                                                                                                                                                                                                                                                                                             tabCocheB.splice(indA, 1, "true")
                                                                                                                                                                                                                                                                                                                             tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                                             tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                                             tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                                             seta50(true)
                                                                                                                                                                                                                                                                                                                             setb50(false)
                                                                                                                                                                                                                                                                                                                             setc50(false)
                                                                                                                                                                                                                                                                                                                             setd50(false)
                                                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "a")
                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                              if(mot=="b"){
                                                                                                                                                                                                                                                                                                                                tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                                tabCocheB.splice(indB, 1, true)
                                                                                                                                                                                                                                                                                                                                tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                                                tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                                                seta50(false)
                                                                                                                                                                                                                                                                                                                                setb50(true)
                                                                                                                                                                                                                                                                                                                                setc50(false)
                                                                                                                                                                                                                                                                                                                                setd50(false)
                                                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "b")
                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                                                                 if(mot=="c"){
                                                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indC, 1, true)
                                                                                                                                                                                                                                                                                                                                  tabCocheB.splice(indD, 1, false)
                                                                                                                                                                                                                                                                                                                                  seta50(false)
                                                                                                                                                                                                                                                                                                                                  setb50(false)
                                                                                                                                                                                                                                                                                                                                  setc50(true)
                                                                                                                                                                                                                                                                                                                                  setd50(false)
                                                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "c")
                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                   if(mot=="d"){
                                                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indA, 1, false)
                                                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indB, 1, false)
                                                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indC, 1, false)
                                                                                                                                                                                                                                                                                                                                    tabCocheB.splice(indD, 1, true)
                                                                                                                                                                                                                                                                                                                                    seta50(false)
                                                                                                                                                                                                                                                                                                                                    setb50(false)
                                                                                                                                                                                                                                                                                                                                    setc50(false)
                                                                                                                                                                                                                                                                                                                                    setd50(true)
                                                                                                                                                                                                                                                                                             tabReponse.splice(ind, 1, "d")
                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                                                                                                                    }                                                                                                                                                                                                                                                   }                                                                                                                                                                    
                                                                                  
 }
  

    return(
        
        <React.Fragment>
              <View>

              <Text style={{fontSize:23,fontWeight:'800',marginTop:10,marginLeft:10,color:'rgba(32,32,32,0.9)'}}>Question {num}</Text>
      
            <View style={{height:1,width:WIDTH,backgroundColor:'gray'}}></View>
             
              <View style={{padding:20}}>
                  <Text style={{fontSize:15,fontWeight:'600',marginTop:10,marginLeft:10}}>{question}</Text>
              </View>
            
      {num ==1 ? 
        <React.Fragment>
            <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
              <Checkbox style={styles.checkbox} value={a1} onValueChange={seta1} />
              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
              <Checkbox style={styles.checkbox} value={b1} onValueChange={setb1} />
              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
              <Checkbox style={styles.checkbox} value={c1} onValueChange={setc1} />
              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
              <Checkbox style={styles.checkbox} value={d1} onValueChange={setd1} />
              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
            </TouchableOpacity>            
      
           
            </React.Fragment> :
            num==2 ? 
            <React.Fragment>
            <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
              <Checkbox style={styles.checkbox} value={a2} onValueChange={seta2} />
              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
              <Checkbox style={styles.checkbox} value={b2} onValueChange={setb2} />
              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
              <Checkbox style={styles.checkbox} value={c2} onValueChange={setc2} />
              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
              <Checkbox style={styles.checkbox} value={d2} onValueChange={setd2} />
              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
            </TouchableOpacity>            
      
           
            </React.Fragment> :
             num==3 ? 
             <React.Fragment>
             <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
               <Checkbox style={styles.checkbox} value={a3} onValueChange={seta3} />
               <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
             </TouchableOpacity>
 
             <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
               <Checkbox style={styles.checkbox} value={b3} onValueChange={setb3} />
               <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
             </TouchableOpacity>
 
             <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
               <Checkbox style={styles.checkbox} value={c3} onValueChange={setc3} />
               <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
             </TouchableOpacity>
 
             <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
               <Checkbox style={styles.checkbox} value={d3} onValueChange={setd3} />
               <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
             </TouchableOpacity>            
       
            
             </React.Fragment> :
              num==4 ? 
              <React.Fragment>
              <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                <Checkbox style={styles.checkbox} value={a4} onValueChange={seta4} />
                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
              </TouchableOpacity>
  
              <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                <Checkbox style={styles.checkbox} value={b4} onValueChange={setb4} />
                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
              </TouchableOpacity>
  
              <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                <Checkbox style={styles.checkbox} value={c4} onValueChange={setc4} />
                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
              </TouchableOpacity>
  
              <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                <Checkbox style={styles.checkbox} value={d4} onValueChange={setd4} />
                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
              </TouchableOpacity>            
        
             
              </React.Fragment> :
                 num==5 ? 
                 <React.Fragment>
                 <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={a5} onValueChange={seta5} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={b5} onValueChange={setb5} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={c5} onValueChange={setc5} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={d5} onValueChange={setd5} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                 </TouchableOpacity>            
           
                
                 </React.Fragment> :
num==6 ? 
                 <React.Fragment>
                 <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={a6} onValueChange={seta6} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={b6} onValueChange={setb6} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={c6} onValueChange={setc6} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={d6} onValueChange={setd6} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                 </TouchableOpacity>            
           
                
                 </React.Fragment> :num==7 ? 
                 <React.Fragment>
                 <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={a7} onValueChange={seta7} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={b7} onValueChange={setb7} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={c7} onValueChange={setc7} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={d7} onValueChange={setd7} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                 </TouchableOpacity>            
           
                
                 </React.Fragment> :num==8 ? 
                 <React.Fragment>
                 <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={a8} onValueChange={seta8} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={b8} onValueChange={setb8} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={c8} onValueChange={setc8} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={d8} onValueChange={setd8} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                 </TouchableOpacity>            
           
                
                 </React.Fragment> :
                 num==9 ? 
                 <React.Fragment>
                 <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={a9} onValueChange={seta9} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={b9} onValueChange={setb9} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={c9} onValueChange={setc9} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={d9} onValueChange={setd9} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                 </TouchableOpacity>            
           
                
                 </React.Fragment> :num==10 ? 
                 <React.Fragment>
                 <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={a10} onValueChange={seta10} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={b10} onValueChange={setb10} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={c10} onValueChange={setc10} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                 </TouchableOpacity>
     
                 <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                   <Checkbox style={styles.checkbox} value={d10} onValueChange={setd10} />
                   <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                 </TouchableOpacity>            
           
                
                 </React.Fragment> :
                 num ==11 ? 
                 <React.Fragment>
                     <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                       <Checkbox style={styles.checkbox} value={a11} onValueChange={seta11} />
                       <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                     </TouchableOpacity>
         
                     <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                       <Checkbox style={styles.checkbox} value={b11} onValueChange={setb11} />
                       <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                     </TouchableOpacity>
         
                     <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                       <Checkbox style={styles.checkbox} value={c11} onValueChange={setc11} />
                       <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                     </TouchableOpacity>
         
                     <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                       <Checkbox style={styles.checkbox} value={d11} onValueChange={setd11} />
                       <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                     </TouchableOpacity>            
               
                    
                     </React.Fragment> :
                     num==12 ? 
                     <React.Fragment>
                     <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                       <Checkbox style={styles.checkbox} value={a12} onValueChange={seta12} />
                       <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                     </TouchableOpacity>
         
                     <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                       <Checkbox style={styles.checkbox} value={b12} onValueChange={setb12} />
                       <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                     </TouchableOpacity>
         
                     <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                       <Checkbox style={styles.checkbox} value={c12} onValueChange={setc12} />
                       <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                     </TouchableOpacity>
         
                     <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                       <Checkbox style={styles.checkbox} value={d12} onValueChange={setd12} />
                       <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                     </TouchableOpacity>            
               
                    
                     </React.Fragment> :
                      num==13 ? 
                      <React.Fragment>
                      <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                        <Checkbox style={styles.checkbox} value={a13} onValueChange={seta13} />
                        <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                        <Checkbox style={styles.checkbox} value={b13} onValueChange={setb13} />
                        <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                        <Checkbox style={styles.checkbox} value={c13} onValueChange={setc13} />
                        <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                        <Checkbox style={styles.checkbox} value={d13} onValueChange={setd13} />
                        <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                      </TouchableOpacity>            
                
                     
                      </React.Fragment> :
                       num==14 ? 
                       <React.Fragment>
                       <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                         <Checkbox style={styles.checkbox} value={a14} onValueChange={seta14} />
                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                       </TouchableOpacity>
           
                       <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                         <Checkbox style={styles.checkbox} value={b14} onValueChange={setb14} />
                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                       </TouchableOpacity>
           
                       <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                         <Checkbox style={styles.checkbox} value={c14} onValueChange={setc14} />
                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                       </TouchableOpacity>
           
                       <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                         <Checkbox style={styles.checkbox} value={d14} onValueChange={setd14} />
                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                       </TouchableOpacity>            
                 
                      
                       </React.Fragment> :
                          num==15 ? 
                          <React.Fragment>
                          <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={a15} onValueChange={seta15} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={b15} onValueChange={setb15} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={c15} onValueChange={setc15} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={d15} onValueChange={setd15} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                          </TouchableOpacity>            
                    
                         
                          </React.Fragment> :
         num==16 ? 
                          <React.Fragment>
                          <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={a16} onValueChange={seta16} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={b16} onValueChange={setb16} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={c16} onValueChange={setc16} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={d16} onValueChange={setd16} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                          </TouchableOpacity>            
                    
                         
                          </React.Fragment> :num==17 ? 
                          <React.Fragment>
                          <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={a17} onValueChange={seta17} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={b17} onValueChange={setb17} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={c17} onValueChange={setc17} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={d17} onValueChange={setd17} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                          </TouchableOpacity>            
                    
                         
                          </React.Fragment> :num==18 ? 
                          <React.Fragment>
                          <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={a18} onValueChange={seta18} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={b18} onValueChange={setb18} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={c18} onValueChange={setc18} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={d18} onValueChange={setd18} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                          </TouchableOpacity>            
                    
                         
                          </React.Fragment> :
                          num==19 ? 
                          <React.Fragment>
                          <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={a19} onValueChange={seta19} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={b19} onValueChange={setb19} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={c19} onValueChange={setc19} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={d19} onValueChange={setd19} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                          </TouchableOpacity>            
                    
                         
                          </React.Fragment> :num==20 ? 
                          <React.Fragment>
                          <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={a20} onValueChange={seta20} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={b20} onValueChange={setb20} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={c20} onValueChange={setc20} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                          </TouchableOpacity>
              
                          <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                            <Checkbox style={styles.checkbox} value={d20} onValueChange={setd20} />
                            <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                          </TouchableOpacity>            
                    
                         
                          </React.Fragment> :
                          num ==21 ? 
                          <React.Fragment>
                              <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                <Checkbox style={styles.checkbox} value={a21} onValueChange={seta21} />
                                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                              </TouchableOpacity>
                  
                              <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                <Checkbox style={styles.checkbox} value={b21} onValueChange={setb21} />
                                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                              </TouchableOpacity>
                  
                              <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                <Checkbox style={styles.checkbox} value={c21} onValueChange={setc21} />
                                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                              </TouchableOpacity>
                  
                              <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                <Checkbox style={styles.checkbox} value={d21} onValueChange={setd21} />
                                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                              </TouchableOpacity>            
                        
                             
                              </React.Fragment> :
                              num==22 ? 
                              <React.Fragment>
                              <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                <Checkbox style={styles.checkbox} value={a22} onValueChange={seta22} />
                                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                              </TouchableOpacity>
                  
                              <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                <Checkbox style={styles.checkbox} value={b22} onValueChange={setb22} />
                                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                              </TouchableOpacity>
                  
                              <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                <Checkbox style={styles.checkbox} value={c22} onValueChange={setc22} />
                                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                              </TouchableOpacity>
                  
                              <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                <Checkbox style={styles.checkbox} value={d22} onValueChange={setd22} />
                                <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                              </TouchableOpacity>            
                        
                             
                              </React.Fragment> :
                               num==23 ? 
                               <React.Fragment>
                               <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                 <Checkbox style={styles.checkbox} value={a23} onValueChange={seta23} />
                                 <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                               </TouchableOpacity>
                   
                               <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                 <Checkbox style={styles.checkbox} value={b23} onValueChange={setb23} />
                                 <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                               </TouchableOpacity>
                   
                               <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                 <Checkbox style={styles.checkbox} value={c23} onValueChange={setc23} />
                                 <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                               </TouchableOpacity>
                   
                               <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                 <Checkbox style={styles.checkbox} value={d23} onValueChange={setd23} />
                                 <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                               </TouchableOpacity>            
                         
                              
                               </React.Fragment> :
                                num==24 ? 
                                <React.Fragment>
                                <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                  <Checkbox style={styles.checkbox} value={a24} onValueChange={seta24} />
                                  <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                </TouchableOpacity>
                    
                                <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                  <Checkbox style={styles.checkbox} value={b24} onValueChange={setb24} />
                                  <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                </TouchableOpacity>
                    
                                <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                  <Checkbox style={styles.checkbox} value={c24} onValueChange={setc24} />
                                  <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                </TouchableOpacity>
                    
                                <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                  <Checkbox style={styles.checkbox} value={d24} onValueChange={setd24} />
                                  <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                </TouchableOpacity>            
                          
                               
                                </React.Fragment> :
                                   num==25 ? 
                                   <React.Fragment>
                                   <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={a25} onValueChange={seta25} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={b25} onValueChange={setb25} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={c25} onValueChange={setc25} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={d25} onValueChange={setd25} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                   </TouchableOpacity>            
                             
                                  
                                   </React.Fragment> :
                  num==26 ? 
                                   <React.Fragment>
                                   <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={a26} onValueChange={seta26} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={b26} onValueChange={setb26} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={c26} onValueChange={setc26} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={d26} onValueChange={setd26} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                   </TouchableOpacity>            
                             
                                  
                                   </React.Fragment> :num==27 ? 
                                   <React.Fragment>
                                   <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={a27} onValueChange={seta27} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={b27} onValueChange={setb27} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={c27} onValueChange={setc27} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={d27} onValueChange={setd27} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                   </TouchableOpacity>            
                             
                                  
                                   </React.Fragment> :num==28 ? 
                                   <React.Fragment>
                                   <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={a28} onValueChange={seta28} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={b28} onValueChange={setb28} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={c28} onValueChange={setc28} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={d28} onValueChange={setd28} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                   </TouchableOpacity>            
                             
                                  
                                   </React.Fragment> :
                                   num==29 ? 
                                   <React.Fragment>
                                   <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={a29} onValueChange={seta29} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={b29} onValueChange={setb29} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={c29} onValueChange={setc29} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={d29} onValueChange={setd29} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                   </TouchableOpacity>            
                             
                                  
                                   </React.Fragment> :
                                   num==30 ? 
                                   <React.Fragment>
                                   <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={a30} onValueChange={seta30} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={b30} onValueChange={setb30} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={c30} onValueChange={setc30} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                   </TouchableOpacity>
                       
                                   <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                     <Checkbox style={styles.checkbox} value={d30} onValueChange={setd30} />
                                     <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                   </TouchableOpacity>            
                             
                                  
                                   </React.Fragment> :  
                                   num ==41 ? 
                                   <React.Fragment>
                                       <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                         <Checkbox style={styles.checkbox} value={a41} onValueChange={seta41} />
                                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                       </TouchableOpacity>
                           
                                       <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                         <Checkbox style={styles.checkbox} value={b41} onValueChange={setb41} />
                                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                       </TouchableOpacity>
                           
                                       <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                         <Checkbox style={styles.checkbox} value={c41} onValueChange={setc41} />
                                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                       </TouchableOpacity>
                           
                                       <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                         <Checkbox style={styles.checkbox} value={d41} onValueChange={setd41} />
                                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                       </TouchableOpacity>            
                                 
                                      
                                       </React.Fragment> :
                                       num==42 ? 
                                       <React.Fragment>
                                       <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                         <Checkbox style={styles.checkbox} value={a42} onValueChange={seta42} />
                                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                       </TouchableOpacity>
                           
                                       <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                         <Checkbox style={styles.checkbox} value={b42} onValueChange={setb42} />
                                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                       </TouchableOpacity>
                           
                                       <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                         <Checkbox style={styles.checkbox} value={c42} onValueChange={setc42} />
                                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                       </TouchableOpacity>
                           
                                       <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                         <Checkbox style={styles.checkbox} value={d42} onValueChange={setd42} />
                                         <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                       </TouchableOpacity>            
                                 
                                      
                                       </React.Fragment> :
                                        num==43 ? 
                                        <React.Fragment>
                                        <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                          <Checkbox style={styles.checkbox} value={a43} onValueChange={seta43} />
                                          <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                        </TouchableOpacity>
                            
                                        <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                          <Checkbox style={styles.checkbox} value={b43} onValueChange={setb43} />
                                          <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                        </TouchableOpacity>
                            
                                        <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                          <Checkbox style={styles.checkbox} value={c43} onValueChange={setc43} />
                                          <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                        </TouchableOpacity>
                            
                                        <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                          <Checkbox style={styles.checkbox} value={d3} onValueChange={setd3} />
                                          <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                        </TouchableOpacity>            
                                  
                                       
                                        </React.Fragment> :
                                         num==44 ? 
                                         <React.Fragment>
                                         <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                           <Checkbox style={styles.checkbox} value={a44} onValueChange={seta44} />
                                           <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                         </TouchableOpacity>
                             
                                         <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                           <Checkbox style={styles.checkbox} value={b44} onValueChange={setb44} />
                                           <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                         </TouchableOpacity>
                             
                                         <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                           <Checkbox style={styles.checkbox} value={c44} onValueChange={setc44} />
                                           <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                         </TouchableOpacity>
                             
                                         <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                           <Checkbox style={styles.checkbox} value={d44} onValueChange={setd44} />
                                           <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                         </TouchableOpacity>            
                                   
                                        
                                         </React.Fragment> :
                                            num==45 ? 
                                            <React.Fragment>
                                            <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={a45} onValueChange={seta45} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={b45} onValueChange={setb45} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={c45} onValueChange={setc45} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={d45} onValueChange={setd45} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                            </TouchableOpacity>            
                                      
                                           
                                            </React.Fragment> :
                           num==46 ? 
                                            <React.Fragment>
                                            <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={a46} onValueChange={seta46} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={b46} onValueChange={setb46} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={c46} onValueChange={setc46} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={d46} onValueChange={setd46} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                            </TouchableOpacity>            
                                      
                                           
                                            </React.Fragment> :num==47 ? 
                                            <React.Fragment>
                                            <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={a47} onValueChange={seta47} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={b47} onValueChange={setb47} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={c47} onValueChange={setc47} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={d47} onValueChange={setd47} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                            </TouchableOpacity>            
                                      
                                           
                                            </React.Fragment> :num==48 ? 
                                            <React.Fragment>
                                            <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={a48} onValueChange={seta48} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={b48} onValueChange={setb48} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={c48} onValueChange={setc48} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={d48} onValueChange={setd48} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                            </TouchableOpacity>            
                                      
                                           
                                            </React.Fragment> :
                                            num==49 ? 
                                            <React.Fragment>
                                            <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={a49} onValueChange={seta49} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={b49} onValueChange={setb49} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={c49} onValueChange={setc49} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={d49} onValueChange={setd49} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                            </TouchableOpacity>            
                                      
                                           
                                            </React.Fragment> :num==50 ? 
                                            <React.Fragment>
                                            <TouchableOpacity onPress={()=>ajoutReponse("a",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={a50} onValueChange={seta50} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{a}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("b",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={b50} onValueChange={setb50} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{b}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("c",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={c50} onValueChange={setc50} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{c}</Text>
                                            </TouchableOpacity>
                                
                                            <TouchableOpacity onPress={()=>ajoutReponse("d",num)} style={{flexDirection:'row',paddingLeft:20}}>
                                              <Checkbox style={styles.checkbox} value={d50} onValueChange={setd50} />
                                              <Text style={{marginTop:7,flexWrap:'wrap',marginRight:10}}>{d}</Text>
                                            </TouchableOpacity>            
                                      
                                           
                                            </React.Fragment> :
            
            <View></View>
            
            }
          </View>
    </React.Fragment>
    )
  }




const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      marginVertical: 32,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 15,
    },
    checkbox: {
      margin: 8,
    },
  });


  export default Quizz