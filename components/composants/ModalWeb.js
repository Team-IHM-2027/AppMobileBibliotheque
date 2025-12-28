import { View, Text, Modal,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'

const ModalWeb = (props) => {
    
    const {modalWeb,setModalWeb} = props.route.params

  return (
   
       <Modal animationType='slide'
         transparent={true}
         visible={modalWeb}
         onRequestClose={() => {
            setModalWeb(!modalWeb)
         }}
        >
            <ScrollView style={{backgroundColor:'rgba(70,130,180,0.9)'}}>
                <TouchableOpacity onPress={()=>setModalWeb(!modalWeb)}>
                    <Text>salut</Text>
                </TouchableOpacity>
            </ScrollView>

      </Modal>

  )
}

export default ModalWeb