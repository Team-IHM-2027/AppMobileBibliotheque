import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image, ImageBackground, Modal, SafeAreaView, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { db } from '../../config'
import { UserContext } from '../context/UserContext'
import SmallRect2 from './SmallRect2'
import { doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp, Timestamp, getDoc, collection, onSnapshot } from "firebase/firestore";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const Matiere = (props) => {
  const { currentUserNewNav, datUser, setDatUser, modalArchive, setModalArchive } = useContext(UserContext)

  const [modalApercu, setModalApercu] = useState(false)
  const [modalTable, setModalTable] = useState(false)
  const [modalContributeurs, setModalContributeurs] = useState(false)
  const [Control, setControl] = useState('apercu')
  const [dataTableMatiere, setDataTableMatiere] = useState([])
  const [loaderTableMatiere, setLoaderTableMatiere] = useState(true)

  const { num, chemin, video, name, img, nameCollection, chemincc, cheminsn, cheminsite, videoPresentation, nomProf, imageProf, objectif, prerequis, nomDepartement, cheminTableMatiere, test, archives } = props.route.params

  const voirCours = (partieDuCours, index, tableCours) => {
    props.navigation.navigate('Cours', {
      partieDuCours: partieDuCours,
      index: index,
      tableCours: tableCours
    })
    setModalTable(!modalTable)
  }

  const voirCoursInscrit = (dataTableMatiere, indChap, indPartieCours, test) => {
    props.navigation.navigate('CoursInscrit', {
      dataTableMatiere: dataTableMatiere,
      indChap: indChap,
      indPartieCours: indPartieCours,
      test: test
    })
  }

  const Sinscrire = async () => {
    if (!currentUserNewNav?.email) {
      Alert.alert("Erreur", "Vous devez être connecté pour vous inscrire")
      return
    }

    try {
      const userRef = doc(db, "BiblioUser", currentUserNewNav.email)
      await updateDoc(userRef, {
        inscritArchi: 'di'
      })
      Alert.alert("Succès", "Demande d'inscription envoyée avec succès !")
    } catch (err) {
      console.error("Error during inscription:", err)
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'inscription")
    }
  }

  const voirVideo = (vid) => {
    if (!vid) {
      Alert.alert("Erreur", "Vidéo non disponible")
      return
    }
    props.navigation.navigate('VideoCours', {
      vid: vid
    })
  }

  useEffect(() => {
    if (!cheminTableMatiere) {
      console.error("cheminTableMatiere is undefined")
      return
    }

    try {
      const tableRef = collection(db, cheminTableMatiere)
      const unsubscribe = onSnapshot(tableRef, 
        (querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
            items.push(doc.data())
          })
          setDataTableMatiere(items)
          setLoaderTableMatiere(false)
        },
        (error) => {
          console.error("Error fetching table matiere:", error)
          setLoaderTableMatiere(false)
        }
      )

      return () => unsubscribe()
    } catch (error) {
      console.error("Error setting up table matiere listener:", error)
      setLoaderTableMatiere(false)
    }
  }, [cheminTableMatiere])

  if (!datUser || loaderTableMatiere) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Chargement...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff', width: WIDTH }}>
      <TouchableOpacity 
        style={{
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          width: 50,
          marginLeft: 20
        }} 
        onPress={() => props.navigation.goBack()}
      >
        <View style={{ backgroundColor: '#000', padding: 1, borderRadius: 25, marginTop: 15 }}>
          <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>{'<<'}</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
        <ImageBackground 
          style={{ height: 250, width: 200 }} 
          source={img ? { uri: img } : require('../../assets/image/barre.jpg')}
        >
          <TouchableOpacity onPress={() => voirVideo(videoPresentation)}>
            <Image 
              style={{ height: 60, width: 60, borderRadius: 35, alignSelf: 'center', marginTop: 100 }} 
              source={require('../../assets/playvideo.png')} 
            />
          </TouchableOpacity>
        </ImageBackground>

        <View style={{ width: 200 }}>
          <Text style={{ padding: 5, textAlign: 'center', color: 'rgb(136,136,136)', fontSize: 15, fontWeight: '800', flexWrap: 'wrap' }}>
            {name || 'Sans titre'}
          </Text>
          <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 12 }}>
            Aborder et mettre en œuvre les principales démarches en architecture système. Acquérir les bases pour élaborer l'architecture d'un système complexe. Formation courte. Experts renommés. Accompagnement sur mesure. Programmes d'études: Digital, Entreprenariat.
          </Text>
          <Text style={{ padding: 5, textAlign: 'center', color: 'rgb(136,136,136)', fontSize: 12, fontWeight: '800' }}>
            Cliquez sur la vidéo pour en savoir plus.
          </Text>
        </View>
      </View>

      <View style={{ margin: 5, marginTop: 30 }}>
        <Text style={{ fontFamily: 'San Francisco', color: 'rgba(32,32,32,0.5)', marginLeft: 25 }}>
          {nomDepartement || 'Département non spécifié'}
        </Text>
        <View style={{ flexDirection: 'row', paddingTop: 25, paddingLeft: 22 }}>
          <Image 
            style={{ height: 30, width: 30, borderRadius: 30 }} 
            source={require('../../assets/image/barre.jpg')} 
          />
          <Text style={{ marginTop: 7, marginLeft: 4, color: 'rgba(32,32,32,0.9)' }}>Difficile</Text>
          <Image 
            style={{ height: 30, width: 30, borderRadius: 30, marginLeft: 20 }} 
            source={require('../../assets/image/alarme.png')} 
          />
          <Text style={{ marginTop: 7, marginLeft: 4, color: 'rgba(32,32,32,0.9)' }}>50 heures</Text>
        </View>
      </View>

      <View style={{ width: 370, alignSelf: 'center' }}>
        {datUser?.inscritArchi === "inscrit" ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 17 }}>
            <TouchableOpacity 
              onPress={() => voirCoursInscrit(dataTableMatiere, 0, 0, test)} 
              style={{ borderRadius: 10, height: 39, backgroundColor: 'rgba(32,32,32,0.9)', width: 120, marginTop: 10 }}
            >
              <Text style={{ color: '#fff', fontWeight: '900', textAlign: 'center', marginTop: 9 }}>Commencer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setModalArchive(!modalArchive)} 
              style={{ borderRadius: 10, height: 39, backgroundColor: 'rgba(32,32,32,0.9)', width: 120, marginTop: 10 }}
            >
              <Text style={{ color: '#fff', fontWeight: '900', textAlign: 'center', marginTop: 9 }}>Archives</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            onPress={Sinscrire} 
            style={{ height: 39, backgroundColor: 'rgba(255,165,0,0.9)', width: 120, marginTop: 10, borderRadius: 10 }}
          >
            <Text style={{ color: '#fff', fontWeight: '900', textAlign: 'center', marginTop: 9 }}>S'inscrire</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ backgroundColor: 'rgba(136,136,136,0.9)', flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, padding: 15 }}>
        <TouchableOpacity onPress={() => setControl('apercu')} style={{ margin: 5 }}>
          <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700', alignSelf: 'center' }}>Aperçu</Text>
          {Control === "apercu" && <View style={{ height: 1, width: 80, backgroundColor: '#fff', alignSelf: 'center' }} />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Matiere