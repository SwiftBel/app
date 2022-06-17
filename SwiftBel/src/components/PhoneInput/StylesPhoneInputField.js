import { Dimensions, I18nManager, Platform, StyleSheet } from 'react-native'
import { palette } from '../../theme'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
  } from '../../utils/Responsive/index'
const width = Dimensions.get('window').width
const colorSet = palette
export default {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorSet.white,
  },
  InputContainer: {
    height: 50,
    color: colorSet.black,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontWeight: "bold",
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 15,
  },

  flagStyle: {
    borderWidth: 1,
    borderColor:palette.lightGrey, 
    borderRadius: 30, 
    marginRight: 5, 
    marginLeft: -20 
  },
  phonInputContainer: {
    marginHorizontal: 40,
    marginRight: 20,
    

  },
  phoneInputTextStyle: {
    borderWidth: 1,
    borderColor: colorSet.grey,
    height: 55,
    alignItems:'center',
    backgroundColor:palette.white,
    fontSize: 15,
    color: 'black',
    borderRadius: 25,
    paddingLeft: 10,

  },
  input: {
    flex: 1,
    borderLeftWidth: 1,
    borderRadius: 3,
    borderColor: colorSet.grey,
    color: colorSet.black,
    fontSize: 17,
    fontWeight: '700',
    backgroundColor: colorSet.black,
  },
  // code input style
  errorMessage:{  
    fontSize:14,
    fontWeight:'400',
    marginLeft:-10,
    paddingBottom:hp('1%'),
    paddingTop:hp('1%'),
    textAlign:'center'
    
    
},
}

