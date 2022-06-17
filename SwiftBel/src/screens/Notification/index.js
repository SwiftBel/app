import * as React from 'react';
import { View,StatusBar, Image, TouchableOpacity, Text, ScrollView,Animated } from 'react-native';
const Notification=(props)=>{

 return(
 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <StatusBar barStyle='dark-content' />
     <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',margin:20}}>Oops! This place looks empty!</Text>
     <Text>Look Like we don't have any Notifications for you</Text>
     {/* <LineChart
     data={{dataSets:[{label: "demo", values: [{y: 1}, {y: 2}, {y: 1}]}]}}
     /> */}
 </View>
    )
}
export default Notification;