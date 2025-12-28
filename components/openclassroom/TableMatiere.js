import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const WIDTH = Dimensions.get('window').width;

const TableMatiere = ({ route, navigation }) => {
  const { numgo } = route.params;
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let collectionPath;
    let cheminTableMatiere;
    
    switch(numgo) {
      case 11:
        collectionPath = 'cours/AAMSP1/S1';
        cheminTableMatiere = 'tableMatiere/AAMSP1/S1';
        break;
      case 12:
        collectionPath = 'cours/AAMSP1/S2';
        cheminTableMatiere = 'tableMatiere/AAMSP1/S2';
        break;
      case 21:
        collectionPath = 'cours/AMSP2/S1';
        cheminTableMatiere = 'tableMatiere/AMSP2/S1';
        break;
      case 22:
        collectionPath = 'cours/AMSP2/S2';
        cheminTableMatiere = 'tableMatiere/AMSP2/S2';
        break;
      case 31:
        collectionPath = 'cours/GI/S1';
        cheminTableMatiere = 'tableMatiere/GI/S1';
        break;
      case 32:
        collectionPath = 'cours/GI/S2';
        cheminTableMatiere = 'tableMatiere/GI/S2';
        break;
      case 41:
        collectionPath = 'cours/GC/S1';
        cheminTableMatiere = 'tableMatiere/GC/S1';
        break;
      case 42:
        collectionPath = 'cours/GC/S2';
        cheminTableMatiere = 'tableMatiere/GC/S2';
        break;
      case 51:
        collectionPath = 'cours/GM/S1';
        cheminTableMatiere = 'tableMatiere/GM/S1';
        break;
      case 52:
        collectionPath = 'cours/GM/S2';
        cheminTableMatiere = 'tableMatiere/GM/S2';
        break;
      case 61:
        collectionPath = 'cours/GELE/S1';
        cheminTableMatiere = 'tableMatiere/GELE/S1';
        break;
      case 62:
        collectionPath = 'cours/GELE/S2';
        cheminTableMatiere = 'tableMatiere/GELE/S2';
        break;
      case 71:
        collectionPath = 'cours/GTEL/S1';
        cheminTableMatiere = 'tableMatiere/GTEL/S1';
        break;
      case 72:
        collectionPath = 'cours/GTEL/S2';
        cheminTableMatiere = 'tableMatiere/GTEL/S2';
        break;
      default:
        console.error('Invalid semester number:', numgo);
        setLoader(false);
        return;
    }

    try {
      const collectionRef = collection(db, collectionPath);
      const q = query(collectionRef, orderBy('name', 'asc'));

      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push({ 
              id: doc.id, 
              ...doc.data(),
              cheminTableMatiere // Add cheminTableMatiere to each item
            });
          });
          setData(items);
          setLoader(false);
        },
        (error) => {
          console.error("Error fetching data:", error);
          setLoader(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up listener:", error);
      setLoader(false);
    }
  }, [numgo]);

  const voirMatiere = (item) => {
    if (!item?.cheminTableMatiere) {
      console.error('cheminTableMatiere is missing for item:', item);
      return;
    }

    navigation.navigate('Matiere', {
      num: item.id,
      chemin: item.chemin || '',
      video: item.video || '',
      name: item.name || 'Sans titre',
      img: item.img || '',
      chemincc: item.chemincc || '',
      cheminsn: item.cheminsn || '',
      cheminsite: item.cheminsite || '',
      videoPresentation: item.videoPresentation || '',
      nomProf: item.nomprof || 'Non spécifié',
      imageProf: item.imageProf || '',
      objectif: item.objectif || [],
      prerequis: item.prerequis || [],
      nomDepartement: item.nomDepartement || 'Non spécifié',
      cheminTableMatiere: item.cheminTableMatiere,
      test: item.test || [],
      archives: item.archives || []
    });
  };

  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff', width: WIDTH }}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => voirMatiere(item)}
        >
          <CadreMatiere name={item.name} src={item.img} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const CadreMatiere = ({ name, src }) => {
  return (
    <View style={{ flexDirection: 'row', margin: 7 }}>
      <Image 
        style={{ height: 90, width: 90, borderRadius: 20 }} 
        source={src ? { uri: src } : require('../../assets/image/barre.jpg')}
        defaultSource={require('../../assets/image/barre.jpg')}
      />
      <View>
        <View style={{ width: 300 }}>
          <Text style={{ margin: 4, fontWeight: '800', color: '#000', fontFamily: 'San Francisco', fontSize: 17 }}>
            {name || 'Sans titre'}
          </Text>
          <Text style={{ flexWrap: 'wrap', color: '#000', margin: 4, fontSize: 10 }}>
            Découvrez toutes les notions qui feront de vous le meilleur ingénieur de tous les temps
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ height: 30, width: 30, borderRadius: 30, marginLeft: 4 }}
            source={require('../../assets/image/barre.jpg')}
          />
          <Text style={{ marginLeft: 5, marginTop: 7, color: '#000' }}>Difficile</Text>
        </View>
      </View>
    </View>
  );
};

export default TableMatiere;