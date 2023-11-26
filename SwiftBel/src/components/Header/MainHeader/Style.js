import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../../../utils/Responsive/index'
import { Platform } from 'react-native'
import { palette } from '../../../theme'
export default {
  RightImage: {
    width: wp('1%'),
    height: hp('2.0%'),
  },
  backArrow: {
    position: 'absolute',
    paddingTop: Platform.OS === 'android' ? 10 : 50,
    zIndex: 1,
    left: 0,
    top: 0,
    zIndex: 1,
    flexDirection: 'row',
    paddingLeft: wp('2%'),
    overflow: Platform.OS === 'android' ? 'hidden' : null,
  },
  mainContainer: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: Platform.os==='ios'?80:80,
    paddingTop: 10,
    backgroundColor:'white',
    marginTop:Platform.OS==='ios'? hp('0%'):hp('-3%'),

    alignItems:'center',
    width:wp('100%'),
   
    borderColor:palette.lightGrey,
    borderBottomWidth:Platform.OS === 'android' ?1:1,
  },
  subContainer: {
    justifyContent: 'center',
  },

  profileContainer: {
    flex: 1,
    height: hp('4%'),
    marginTop: Platform.OS === 'android' ? hp('3%') : hp('7%'),
    marginBottom: hp('2%'),
    marginLeft: wp('2%'),
    zIndex: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  backText: {
    paddingHorizontal: wp('1%'),
    fontSize: 16,
    color: palette.black,
    textAlign: 'center'
  }
}