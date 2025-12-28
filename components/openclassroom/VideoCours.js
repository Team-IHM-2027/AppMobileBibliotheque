import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';


const VideoCours = (props) => {
    const {vid} = props.route.params
    return (
        <WebView
          
          source={{uri:vid}}
        />
      );
}

export default VideoCours