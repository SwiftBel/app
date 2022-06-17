import * as React from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { palette } from '../../../theme';
import TopScroolableTabBar from '../Components/TopScroolableTabBar'
const Languages=(props)=>{
    const {data}=props
 return(
    <View
    style={style.container}>
        <Text style={{  color:palette.black}}>{data}</Text>
    </View>
 )
}


const style=StyleSheet.create({
  container:{
    marginLeft:5,
    marginRight: 5,
    marginTop:10,
    borderRadius: 26,
    width: 180,
    marginBottom:-8,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1
  }
})
export default Languages;

