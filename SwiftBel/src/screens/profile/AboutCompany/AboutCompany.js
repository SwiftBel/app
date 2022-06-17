import React, { useEffect } from 'react'
import{View,Text} from 'react-native'
import { TextKeyValue } from '../../../components'
import MapviewList from '../../../components/MapViewList'
import { palette } from '../../../theme'
import { useSelector, useDispatch } from 'react-redux'
import {getPostData,getProfileDetails} from '../../../store/actions/Profile.action'
const AboutCompany=(props)=>{
    const dispatch = useDispatch();
    const {data}=props
    return(
        <View style={{marginTop:10}}>
        <Text style={{marginLeft:20,marginBottom:20,fontSize:18,color:palette.black}}>Overview</Text>
        <TextKeyValue
        title={"Industry"}
        value={"__"}
        valueStyle={{color:palette.grey}}
        Container={{marginBottom:10}}
    />
      <TextKeyValue
        title={"Headquarters"}
        value={data?.headquarterIn||"__"}
        valueStyle={{color:palette.grey}}
        Container={{marginBottom:10}}
    />
     <TextKeyValue
        title={"Founded"}
        value={data?.foundedIn||"__"}
        valueStyle={{color:palette.grey}}
        Container={{marginBottom:10}}
    />
     <TextKeyValue
        title={"Company size"}
        value={data?.companySize||"__"}
        valueStyle={{color:palette.grey}}
        Container={{marginBottom:10}}
    />
     <Text style={{marginLeft:20,marginBottom:20,marginTop:16, fontSize:14}}>
    {data?.aboutUs||"__"}
     </Text>
     <TextKeyValue
        title={"Location"}
        value={`${data?.address?.buildingNumber} ${data?.address?.address} ${data?.address?.street} ${data?.address?.city} ${data?.address?.country}` }
        valueStyle={{color:palette.grey}}
        Container={{marginBottom:10}}
    />
    <View style={{flex:1,width:"95%",height:250,alignSelf:'center'}}>
    <MapviewList
    onDragEnd={(e) => console.log(e, "e")}
    position={{ latitude:data?.location?.lng||0, longitude:data?.location?.lat||0}}
    latitudeDelta={ 0.015}
    longitudeDelta={ 0.0121}
    mapStyle={{position:'absolute'}}
/>
</View>
    </View>
    )
}
export default AboutCompany