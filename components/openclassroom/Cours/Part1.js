import { View, Text, Modal, SafeAreaView } from 'react-native'
import React, { useContext } from 'react'
import { UserContexte } from '../../vues/MainContainer'

 

const Part1 = () => {
    const {VuePartCours,setPartVueCours}= useContext(UserContexte)

  return (
    <Modal animationType='slide'
    transparent={true}
    visible={VuePartCours}
    onRequestClose={() => {
        setPartVueCours(!VuePartCours)
  }}
  >

    <SafeAreaView style={{backgroundColor:'red',height}}>

    </SafeAreaView>



  </Modal>
      
  )
}

export default Part1