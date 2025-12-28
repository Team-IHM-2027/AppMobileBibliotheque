import { View, Text,SafeAreaView,Image,TouchableOpacity,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'



const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const PageWeb2 = (props) => {

    const {chemin} = props.route.params

    //la webview
    const webviewRef = React.useRef(null);
    function webViewgoback() {
      if (webviewRef.current) webviewRef.current.goBack();
    }

  return (
    <SafeAreaView style={styles.container}>
    <View style={{backgroundColor:'black',width:WIDTH,height:HEIGHT,flex:1}}>

      <TouchableOpacity style={{shadowColor: '#171717',shadowOffset: {width: -2, height: 4},shadowOpacity: 0.4,shadowRadius: 3,width:50,marginLeft:20}} onPress={webViewgoback}>
        <View style={{backgroundColor:'#000',padding:1,borderRadius:25,marginTop:15}}>
        <Text style={{fontSize:20,color:'#fff',textAlign:'center'}}>{'<<'}</Text>
        </View>
      </TouchableOpacity>

        <WebView
           startInLoadingState={true}
           ref={webviewRef}
         source={{uri: chemin }} />

     
    </View>    
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabBarContainer: {
      backgroundColor: "#d3d3d3",
    //  height: 26,
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 16,
      justifyContent: "space-between",
    },
})


export default PageWeb2