
import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default{
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
    documentPickerContainer:{
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf:'center',
        borderWidth: 1,
        width:wp('90%'), 
        borderStyle: 'dashed',
        backgroundColor:palette.smokeWhite,
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
        width: 40,
        height: 40, 
        alignSelf: 'center',
        marginTop: hp('2%'),
        marginBottom:hp('2%'),
    },
    documentName:{
        fontSize: 16,
         marginBottom: hp('3%'), 
         marginLeft: wp('5%'), 
         color: palette.blue 
    }
}