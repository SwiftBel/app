import { Platform } from "react-native";
import { palette } from "../../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../../utils/Responsive/index'

export default{
    container:{
        marginLeft:wp('0.8'),
        marginRight: wp('0.5%'),
        marginTop:10,
        marginBottom:-8,
        borderRadius: 16,
        width: 125,
        height: 120,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postImage:{
        height:'100%',
        width:'100%'
    },
    postHeader:{
        backgroundColor:'white',
        marginTop:Platform.OS==='ios'? hp('1%'):hp('2%'),
        marginBottom:hp('1%'), 
        alignItems:'center'
    },
    postListContainer:{
        marginTop:hp('1%'),
        width: wp('100%'),
        height: hp('50%'),
        backgroundColor: palette.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText:{
        marginLeft:wp('3%'),
        marginTop:hp('1%'),
        color:palette.grey,
        fontSize:14
    },
    captionText:{
        marginLeft:wp('3%'),
        marginTop:hp('1%'),
        marginRight:hp('2%'),
        marginBottom:hp('2%'),
        color:palette.black,
        fontSize:14
    }
}