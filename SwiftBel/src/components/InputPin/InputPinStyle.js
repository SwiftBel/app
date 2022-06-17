import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
const colors={
    Primary:palette.black?palette.black:palette.grey,
    border:palette.grey
}
export default {

    inputContainer:{
        flexDirection:'row',
        marginRight:10,
        height:56,
        width:48,
        borderRadius:27,
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:'#F3F3F3'
        ,
        shadowColor:palette.grey,
        // elevation:3,
        // shadowRadius:1.22,
        // shadowOffset:{
        //     width:0,
        //     height:1
        //      },
        // shadowOpacity:1.0
    },
    textInputStyle:{
        paddingTop:10,
        paddingBottom:8,
        fontSize:16,
        color:colors.Primary,
        alignSelf:'center',
        textAlign:'center',
        paddingHorizontal:18,
        paddingVertical:10,
    },
    PasswordValidation:{
       
        fontSize:14,
        fontWeight:'400',
        paddingLeft:wp('3%'),
        paddingBottom:hp('1%')
    },
}