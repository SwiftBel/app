import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
    import {Platform} from 'react-native'
import { palette } from '../../theme'
export default{
    backImage:{
        width:wp('2.5%'),
        height:hp('2.5%'),
        alignSelf:'center',
        tintColor:palette.black,
       
    },
    container: {
        height: 44,
        paddingHorizontal: wp('50%'),
        paddingTop: 10,
        zIndex:1,
      },
      profileContainer: {
        height: hp('4%'),
        marginTop: Platform.OS === 'android'? hp('3%'):hp('7%'),
        marginBottom:hp('2%'),
        marginLeft:hp('2%'),
        zIndex:1,
      },
    backArrow: {
        position: 'absolute',
        paddingTop:  Platform.OS === 'android'?10:50,
        zIndex:1,
        left: 0,
        top: 0,
        zIndex: 1,
        flexDirection:'row',
        paddingLeft:wp('2%'),
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