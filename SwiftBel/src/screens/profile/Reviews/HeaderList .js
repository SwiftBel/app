import React from 'react'
import { Text,View } from 'react-native'
import * as Progress from 'react-native-progress';
import { palette } from '../../../theme';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Back, Etc } from '../../../assets';

const HeaderList=(props)=>{
    const { data } = props
    console.log(data,"data")
    const rating=[
        {
            name:'Friendliness',
            rating:data?data[0]?.friendliness:0,
        },
        {
            name:'On time arrival',
            rating:data?data[0]?.onTimeArrival:0,
        },
        {
            name:'Communication',
            rating:data?data[0]?.communication:0,
        },
        {
            name:'Efficient at their job',
            rating:data?data[0]?.efficientAtThierJob:0,
        },
        {
            name:'Fair and Transparent pricing',
            rating:data?data[0]?.fairAndTransparentPricing:0,
        }
    ]
    return(
        <View style={{marginTop:20,marginBottom:20,marginLeft:10}}>
        {rating.map((item)=>{
            return(
        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15}}>
            <View style={{width:'50%'}}>
            <Text style={{alignItems:'center',color:palette.black}}>{item.name}</Text>
            </View>
            <View style={{height:5,alignSelf:'center',alignItems:'center',  flexDirection:'row',justifyContent:'space-between',width:'50%'}}>
         <Progress.Bar style={{backgroundColor:'white'}}  color={palette.grey} progress={item.rating/5} width={150} height={5} />
         <Text style={{height:20,alignSelf:'center',margin:10,color:palette.black}}> {item.rating}</Text>
         </View>
         </View>)
         })}
    </View>
    )
}
export default HeaderList