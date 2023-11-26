import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../../utils/Responsive/index'
import { Platform } from 'react-native'
import { palette } from '../../theme'
export default {
  backImage: {
    width: wp('3.0%'),
    height: hp('2.5%'),
    alignSelf: 'center',
    tintColor: palette.black,

  },
  subContainer: {
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 18,
    fontFamily: 'Roobert-Medium',
    color: palette.black,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightView: {
    position: 'absolute',
    right: 0,
    paddingRight: wp('5%'),
    top: 0,
    zIndex: 2,
    borderRadius: Platform.OS === 'android' ? 15 : 0,
    overflow: Platform.OS === 'android' ? 'hidden' : null,
    paddingTop: Platform.OS === 'android' ? 28 : 35,
    // marginBottom: Platform.OS === 'ios' ? 0 : -35,
  },
  rightText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Roobert-Medium',
    color: palette.black,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  container: {
    height: 74,
    paddingHorizontal: wp('5%'),
    paddingTop: 10,
    
  },
  containerView: {
    alignItems: 'center',
    width: '100%',
    height:Platform.OS === 'android' ?75:100,
    flexDirection: 'row',
    justifyContent: 'center',
  
  },
  profileContainer: {
    height: 35,
    marginTop: Platform.OS === 'android' ? hp('2%') : hp('7%'),
    marginBottom: hp('2%'),
    marginLeft: hp('2%'),
    zIndex: 1,
   
    // borderBottomWidth: 1,
    //borderBottomColor: palette.smokeWhite,
  },
  backArrow: {
    position: 'absolute',
    width:wp('12%'),
    paddingTop: Platform.OS === 'android' ? 28 : 37,
    zIndex: 1,
    left: 0,
    top: 0,
    zIndex: 1,
 
    overflow: Platform.OS === 'android' ? 'hidden' : null,
  },
  backText: {
    paddingHorizontal: wp('1%'),
    fontSize: 16,
    //paddingLeft:wp('2%'),
    color: palette.white,
    textAlign: 'center'
  }
}