import * as React from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView,Animated } from 'react-native';
import { moving } from '../../assets';
import { TextKeyValue } from '../../components';
import MainHeader from '../../components/Header/MainHeader/MainHeader';
import HorizontalTextKeyValue from '../../components/TextKeyValue/HorizontalTextKeyValue';
import { palette } from '../../theme';
const OnGoing=(props)=>{

 return(
 <View style={{flex:1,}}>
    <MainHeader
    centerText='Bookings'
    />

    <View style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',paddingBottom:20,borderBottomWidth:1,borderColor:palette.lightGrey}}>
    <View style={{justifyContent:'center',alignItems:'center',padding:15,borderRadius:10,backgroundColor:palette.smokeWhite}}>
    <Image
    source={moving}
    style={{width:55,height:55}}
    />
    </View>
<View style={{marginLeft:15}}>
    <Text style={{fontSize:20,fontWeight:'500'}}>Moving</Text>
    <Text style={{fontSize:16,color:palette.grey,marginTop:5}}>Vancouver,BC,Canada</Text>
    <Text style={{fontSize:16,color:palette.grey,marginTop:5}}>23 March 2023 , 10:00AM</Text>
</View>
</View>

<View style={{marginLeft:-10, marginTop:20,paddingBottom:20,borderBottomWidth:1,borderColor:palette.lightGrey}}>
<HorizontalTextKeyValue
title={'From address'}
value={'Vancouver ,BC ,Canada'}

/>
<HorizontalTextKeyValue
title={'To address'}
value={'Richmond,BC,Canada'}

/>
</View>
<View style={{alignItems:'center'}}>
<TouchableOpacity onPress={()=>props.navigation.navigate('LocationDestinationTraker')} style={{width:'95%',borderRadius:10, backgroundColor:palette.smokeWhite,borderWidth:1,borderColor:palette.lightGrey,height:60,marginTop:20,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:16,fontWeight:'500',color:palette.pink}}>Track order</Text>
</TouchableOpacity>
    </View>
    </View>
 </View>
    )
}
export default OnGoing;