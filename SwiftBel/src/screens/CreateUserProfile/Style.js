import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {

//...........................Common Style.............................//

    container:{
       flex: 1, 
        backgroundColor:palette.white,
    },
    bottomContainer:{
        position:'absolute',
        bottom:0,
        right:0,
        margin:20
    },
    button:{
        backgroundColor:palette.black,
        height:44,
        width:wp('40%'),
        borderRadius:22,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:hp("2%")
    },
    buttonText:{
        color:palette.white,
        fontSize:14,
        fontWeight:'400',
        textAlign:'center',
        fontFamily:"Roobert-Medium",
    },
    backButton:{
        height:44,
        width:wp('40%'),
        borderRadius:22,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:hp("2%")
    },
// ........................LocationStyle.........................//

    locationBottomContainer:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        margin:20
    },
    dragView:{
        position:'absolute',
       top:Platform.OS==='android'?hp('2%'): hp('2%'),
        alignSelf:'center',
        justifyContent:'center',
        width:wp('90%'),
        borderRadius:30,
        height:300,
        zIndex:1
    },
    dragText:{
        fontSize:14,
        textAlign:'center',
        color:palette.black
    },

//.......................PhoneCodeStyle....................................//

    mailButtonText:{
        color:palette.grey,
        fontSize:14,
        fontWeight:'400',
        textAlign:'center'
    },
    resendMailButton:{
        height:40,
        width:wp('65%'),
        borderRadius:10,
        justifyContent:'center',
        borderWidth:1,
        borderColor:palette.grey,
        alignItems:'center',
        marginBottom:hp("2%")
},
errorMessage:{
       
    fontSize:14,
    fontWeight:'400',
    paddingLeft:wp('3%'),
    paddingBottom:hp('1%')
},
//.........................ServicesStyle....................................//

    sectionListHeader:{
        padding:15,
        fontSize:16,
        fontWeight:'500',
        color:palette.black

    },
    serviceButton:{
        alignItems:'center',
        height:80,
        borderWidth:0.5,
        justifyContent:'center',
        borderRadius:15,
        overflow:'hidden'
    },
    ServiceRenderContainer:{
        flex: 0.5, 
        padding: 5, 
        justifyContent: 'space-between'
    },

//.....................UploadDocumentStyle...............................
    documentIconContainer:{
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf:'center',
        height: 180, 
        borderWidth: 1,
        width:wp('90%'), 
        borderStyle: 'dashed',
        borderColor:palette.grey , 
        marginTop: hp('2%'),
        marginBottom:hp('2%'),
        borderRadius: 20 
    },
    documentIcon:{
        width:wp('89.5%'),
        height:178,
        overflow:'hidden'
    },
    iconStyle:{
        width: 85,
        height: 85, 
        alignSelf: 'center'
    },

//...........................AddOwner......................................
    keyBoardWrapper:{
        flex: 1, 
        marginBottom: hp('1%')
    }
}