import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {

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
    companyNameText:{
        alignSelf:'center',
        fontWeight:'500',
        fontSize:18,
        color:palette.black,
        marginBottom:10
    },
    MottoText:{
        alignSelf:'center',
        fontWeight:'400',
        fontSize:18,
        color:palette.black,
        marginBottom:10
    },
    languageText:{
        alignSelf:'center',
        fontWeight:'400',
        fontSize:14,
        color:palette.grey,
        marginBottom:10
    }
}