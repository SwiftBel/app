import { palette } from '../../theme'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {
    container:{

        marginLeft:wp('5%'),
        marginRight:wp('5%'),
    },
    keyStyle:{
        fontSize:14,
        color:palette.grey,
        marginRight:wp('1%'),
        fontWeight:'500',
        fontFamily:"Roobert-Medium",

    },
    ValueStyle:{
        fontSize:16,
        color:palette.black,
        marginRight:wp('1%'),
        paddingTop:hp('1%'),
    },
    horizontalKey:{
        fontSize:14,
        color:palette.grey,
        marginLeft:wp('0.5%'),
        fontWeight:'500',
        paddingTop:hp('2%'),
    },
    horizontalValueStyle:{
        fontSize:16,
        color:palette.black,
        marginRight:wp('1%'),
        paddingTop:hp('2%'),
        
    }
}