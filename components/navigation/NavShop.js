import {createStackNavigator} from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import VueUn from '../vues/VueUn'
import Cathegorie from '../composants/message/Cathegorie'
import Panier from '../composants/achats/Panier'
import Produit from '../composants/achats/Produit'
import FichePaie from '../composants/achats/FichePaie'
import BigRect from '../composants/BigRect'
import Cercle from '../composants/Cercle'
import SmallRect from '../composants/SmallRect'
import PageWeb from '../composants/PageWeb'
import ModalWeb from '../composants/ModalWeb'
import Email from '../composants/message/EnhancedEmail'
import ChatBot from '../composants/chatBot/ChatBot'

import ScreenVueUn from '../vues/ScreenVueUn'

const screenOptions = {
     headerShown: false,
}

const Stack = createStackNavigator()

const NavShop = () => {
     const navigation = useNavigation();

     useEffect(() => {
          const unsubscribe = navigation.addListener('tabPress', (e) => {
               // If the tab is already focused, reset the stack to the initial screen
               if (navigation.isFocused()) {
                    navigation.reset({
                         index: 0,
                         routes: [{ name: 'ScreenVueUn' }],
                    });
               }
          });

          return unsubscribe;
     }, [navigation]);

     return (
     <Stack.Navigator initialRouteName='ScreenVueUn' screenOptions={screenOptions}>
           <Stack.Screen name='ScreenVueUn' component={ScreenVueUn} />
         <Stack.Screen name='VueUn' component={VueUn} />
         <Stack.Screen name='Panier' component={Panier} />
         <Stack.Screen name='Produit' component={Produit} />
         <Stack.Screen name='FichePaie' component={FichePaie} />

         <Stack.Screen name='BigRect' component={BigRect} />
         <Stack.Screen name='Cercle' component={Cercle} />
         <Stack.Screen name='Cathegorie' component={Cathegorie} />
         <Stack.Screen name='SmallRect' component={SmallRect} />
         <Stack.Screen name='PageWeb' component={PageWeb} />
         <Stack.Screen name='ModalWeb' component={ModalWeb} />

         {/* COMPOSANT PRINCIPAL : Votre chat existant amélioré */}
         <Stack.Screen name='Email' component={Email} />

         <Stack.Screen
             name='ChatBot'
             component={ChatBot}
             options={{
                  headerShown: false,
                  title: "Assistant Bibliothèque"
             }}
         />
    </Stack.Navigator>
     )
}

export default NavShop