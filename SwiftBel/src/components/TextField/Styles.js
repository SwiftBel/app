import { palette } from '../../theme'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default{

    container:{
        justifyContent:'space-between',
        borderWidth:1,
        width:wp('95%'),
        height:50,
        paddingLeft:wp('3%'),
        flexDirection:'row',
        paddingRight:wp('3%')
    },
    Logo_Style:{
        width:wp('4%'),
        height:hp('4%'),
        alignSelf:'center'
    },
    PasswordValidation:{
       
        fontSize:14,
        fontWeight:'400',
        paddingLeft:wp('5%'),
        paddingTop:wp('2%')
    },
    headerName:{
        fontSize:14,
        fontWeight:'400',
        paddingLeft:wp('5%'),
        paddingTop:wp('2%'),
        paddingBottom:wp('2%'),
        color:palette.black,
    },
}