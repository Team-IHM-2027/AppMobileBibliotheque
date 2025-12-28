import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { UserContexte } from '../../vues/MainContainer'
import Part1 from './Part1'


const NavPart = () => {
    const {VuePartCours,setPartVueCours}= useContext(UserContexte)
  return (
    <View>
    {  VuePartCours=="VuesFirst"?
    <Part1 />
     :
      ( VuePartCours=="vue1"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :
      ( VuePartCours=="vue2"?
      <Part1 />
      :( VuePartCours=="vue3"?
      <View style={{backgroundColor:'green',height:500,width:1000}}></View>
      :( VuePartCours=="vue3"?
      <View style={{backgroundColor:'blue',height:500,width:1000}}></View>
      :( VuePartCours=="vue4"?
      <View style={{backgroundColor:'orange',height:500,width:1000}}></View>
      :( VuePartCours=="vue5"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue6"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue7"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue8"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue9"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue10"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue11"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue12"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue13"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :( VuePartCours=="vue14"?
      <View style={{backgroundColor:'red',height:500,width:1000}}></View>
      :<View></View>))))))))))
      ))
      )
      )
      )
     }
    </View>
 

  )
}

export default NavPart