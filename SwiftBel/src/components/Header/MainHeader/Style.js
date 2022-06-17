import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../../utils/Responsive/index'
    import {Platform} from 'react-native'
import { palette } from '../../../theme'
export default{
    RightImage:{
        width:wp('1%'),
        height:hp('2.0%'),
    },

      profileContainer: {
          flex:1,
        height: hp('4%'),
        marginTop: Platform.OS === 'android'? hp('3%'):hp('7%'),
        marginBottom:hp('2%'),
        marginLeft:wp('2%'),
        zIndex:1,
        position:'absolute',
        top:0,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
      },
    backArrow: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        overflow: Platform.OS === 'android' ? 'hidden' : null,
      },
      backText:{
        paddingHorizontal: wp('1%'),
        fontSize:16,
        //paddingLeft:wp('2%'),
        color:palette.black,
        textAlign:'center'
      }
}