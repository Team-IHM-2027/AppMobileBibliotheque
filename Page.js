import React, { FC, useState,useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import {Picker} from '@react-native-picker/picker';




const Page = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  
  function close() {
    pickerRef.current.blur();
  }
  
  return(
  <Picker
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript1" value="js" />
  <Picker.Item label="JavaScript2" value="js2" />
  <Picker.Item label="JavaScript3" value="js3" />
  <Picker.Item label="JavaScript4" value="js4" />
  <Picker.Item label="JavaScript5" value="js5" />
  <Picker.Item label="JavaScript6" value="js6" />
  <Picker.Item label="JavaScript7" value="js7" />
  <Picker.Item label="JavaScript8" value="js8" />
</Picker>
 ) 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export default Page;