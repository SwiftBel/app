import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {

//...........................Common Style.............................//

    container:{
        backgroundColor:palette.white,
      // flex:1
    },
    bannerContainer:{
        height:hp('24%'),
        width:wp('100%'),
        justifyContent:'center',
       // marginBottom:70
    },
    bannerImage_Style:{
        height:"100%",
        width:'100%'
    },
    profileContainer:{
        borderRadius:400,
        backgroundColor:'white',
        height:Platform.OS==='ios'?hp('14%'): hp('14%'), 
        width: Platform.OS==='ios'?wp('28%'): hp('14%'),
        alignSelf:'center',
        marginTop:hp('-7%'),
    },
    profileButton:{
        justifyContent:'center',
        alignItems:'center'
    },
    profileImage:{
       alignSelf:'center',
        height:'95%',
        width:'95%',
        borderRadius:400
    },
    MottoText:{
        alignSelf:'center',
        fontWeight:'400',
        fontSize:16,
        color:palette.black
    },
    informationContainer:{
        flexDirection:'row',
        alignSelf:'center',
        marginLeft:wp('5%'),
        marginBottom:hp('2%'),
        marginTop:hp('2%')
    },
    InformationTextStyle:{
        alignSelf:'center',
        fontWeight:'400',
        fontSize:16,
        marginRight:wp('5%'),
        color:palette.black
    },
    favourateButton:{
        borderRadius:25,
        width:wp('40%')
        ,backgroundColor:palette.white,
        height:45,
        justifyContent:'center',
        marginRight:10,
        borderWidth:1
    },
    bookButton:{
        borderRadius:25,
        width:wp('50%')
        ,backgroundColor:palette.black,
        height:45,
        justifyContent:'center',
       // marginLeft:10
    },
    favourateButtonText:{
        fontSize:14,
        color:palette.black,
        textAlign:'center'
    },
    bookButtonText:{
        fontSize:14,
        color:palette.white,
        textAlign:'center'
    },
    headerContainer: {
        flex:1,
      //height: hp('4%'),
      marginTop: Platform.OS === 'android'? hp('2%'):hp('7%'),
      marginBottom:hp('2%'),
      marginLeft:wp('2%'),
      zIndex:1,
      position:'absolute',
      top:0,
      marginRight:wp('3%'),
      width:'100%'
    },
    postHeader:{
        backgroundColor:'white',
        marginTop:Platform.OS==='ios'? hp('7%'):hp('-1%'),
        marginBottom:hp('1%'),
        marginLeft:wp('2%'), 
        alignItems:'center'
    },
    NewpostHeader:{
        backgroundColor:'white',
        marginTop:hp('1%'),
        marginBottom:hp('1%'),
        marginLeft:wp('2%'), 
        alignItems:'center'
    },
}