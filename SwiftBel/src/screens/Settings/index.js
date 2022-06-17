import * as React from 'react';
import { View, Image, Text, FlatList, Dimensions,ScrollView, TouchableOpacity, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Etc, rightBack } from '../../assets';
import { palette } from '../../theme';
import {DataList} from './DataList'
import Styles from './Styles';
const Setting = (props) => {
   const [ref,setRef]=React.useState()
   const [selectIndex,setSelectIndex]=React.useState(0)
    const getItemLayout = (data, index) => {
        console.log(index,"height")
        return ({
            length:165  ,
            offset:270 * index,
            index
        })
    }

    const onChange=(nativeEvent)=>{
        if(nativeEvent){
            const slide=Math.ceil(nativeEvent.contentOffset.y/nativeEvent.layoutMeasurement.width);
            console.log(slide)
            setSelectIndex(slide)
        }
    }

    const topTabData=[
      'Account Settings','Managing','Support','Legal'
    ]

    const onpressLogout=async()=>{
        Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
              {text: 'Cancel', onPress: () => {return null}},
              {text: 'Confirm', onPress: async() => {
                await EncryptedStorage.removeItem("access_token");
                props.navigation.navigate('SignUp')
              }},
            ],
            { cancelable: false }
          ) 
    }
    const renderItem=({item,index})=>{
        return(
            <View style={{flex:1,marginBottom:20,marginLeft:10,marginTop:10}}
            >
                {
                    item.data.map((e,index)=>
                        <View 
                        key={index}
                        style={Styles.ButtonContainer}>
                            <TouchableOpacity style={Styles.buttonStyle} 
                            onPress={()=>props.navigation.navigate(e.screen)}>
                            <View style={{flexDirection:'row'}}> 
                            {
                            e?.icon?
                            <Image
                            source={e.icon}
                            resizeMode='contain'
                            style={Styles.iconStyle}
                            />:null
                        }
                        <Text style={{fontSize:16,color:palette.black}}>{e.title}</Text>
                       
                        </View>
                        <Image
                        source={rightBack}
                        resizeMode='contain'
                        style={Styles.iconStyle}
                        />
                        </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        )
    }
    return (
        <View style={Styles.container}>
        <Text style={{fontSize:24,marginTop:20,marginLeft:20}}>Your Profile</Text>
        <View style={{alignItems:'center',margin:20}}>
        <TouchableOpacity style={{height:50,width:'95%',justifyContent:'center',alignItems:'center',backgroundColor:palette.black,borderRadius:15}} onPress={()=>props.navigation.navigate('Login')}>
            <Text style={{fontSize:18,color:palette.white}}>Log In</Text>
        </TouchableOpacity>
       
        </View>
        <View style={{flexDirection:'row',marginLeft:40}}>
        <Text style={{fontSize:16,}}>Don`t have an account?</Text>
        <TouchableOpacity onPress={()=>props.navigation.navigate('SignUp')}>
            <Text style={{fontSize:16,fontWeight:'500'}}>Sign Up</Text>
        </TouchableOpacity>
        </View>
            <FlatList
                data={DataList}
                contentContainerStyle={{paddingBottom:300}}
                onScroll={({nativeEvent})=>onChange(nativeEvent)}
                getItemLayout={(data, index) => getItemLayout(data, index)}
                initialScrollIndex={selectIndex}
            //     ListFooterComponent={
            //         <TouchableOpacity style={Styles.buttonStyle} onPress={()=>onpressLogout()} >
            //     <Text style={{fontSize:16,marginLeft:20,color:palette.pink}}>LOG OUT</Text>
            // </TouchableOpacity>
            //     }
                ref={(ref)=>setRef(ref)}
                renderItem={renderItem}
            />
            
        </View>)
}
export default Setting;