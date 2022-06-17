import * as React from 'react';
import {
    SwiftBel,
} from '../assets/index';
import { View, Text, Image, Keyboard, Easing ,KeyboardAvoidingView,TouchableWithoutFeedback,StyleSheet} from 'react-native';
import Header from './Header/Header';
import { palette } from '../theme/Palette';
import KeyBoardAvoidingWrapper from './KeyBoardAvoidingWrapper';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../utils/Responsive/index'
const CommonLayout = ({children,navigation}) => {
    return (
        <KeyBoardAvoidingWrapper behavior={"height"} style={Style.container} >
            <View >
            <Header goBack={()=>navigation.goBack()}/>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image
                source={SwiftBel}
                style={Style.LogoName_Style}
                resizeMode='contain'
            />
            </View>
            <View style={Style.bottomContainer}>
                <View style={{ margin: 30,alignItems:'center',width:'100%',marginTop:40}}>
                {children}
                </View>
            </View>
            </View>
        </KeyBoardAvoidingWrapper>
    );
}
const Style=StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' ,
        backgroundColor:palette.babyPink,
       
    },
    bottomContainer:{
        zIndex:1, 
        backgroundColor:palette.white,
        width:wp('100%'),
        alignItems: 'center', 
        justifyContent: 'center',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    LogoName_Style:{
        width:200,
        height:70,
    }
})
export default CommonLayout;