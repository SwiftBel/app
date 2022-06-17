import * as React from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView,Animated } from 'react-native';
const EmptyScreen=(props)=>{

 return(
 <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:80}}>
     <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',margin:20}}>{props.ScreenText}</Text>
 </View>
    )
}
EmptyScreen.defaultProps={
    ScreenText:''
}
export default EmptyScreen;