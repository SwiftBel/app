import { Dimensions, Platform, StyleSheet } from 'react-native'
import { palette } from '../../theme'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
  } from '../../utils/Responsive/index'
const { height, width } = Dimensions.get('window')
const PADDING = 8
const BORDER_RADIUS = 20
const FONT_SIZE = 18
const OPTION_CONTAINER_HEIGHT = 260
const colorSet = palette

export default {
 
    overlayStyle: {
      width,
      height,
      backgroundColor: '#00000059',
      //borderWidth:1
    },

    optionContainer: {
      //borderRadius: BORDER_RADIUS,
      width: width * 1,
      backgroundColor: "#F5F5F5",
      left: width * 0.00,
      height:260,
      top: Platform.OS === 'android'?(height - OPTION_CONTAINER_HEIGHT) / 2.25 : (height - OPTION_CONTAINER_HEIGHT) / 1.00,
    },

    cancelContainer: {
      left: width * 0.02,
      top: Platform.OS === 'android'?(height - OPTION_CONTAINER_HEIGHT) / 1.25 + 10:(height - OPTION_CONTAINER_HEIGHT) / 1.15 + 10,
    },

    cancelStyle: {
      borderRadius: 15,
      width: width * 0.95,
      height:50,
      backgroundColor: palette.white,
      padding: PADDING,
      justifyContent:'center',
    },

    cancelTextStyle: {
      textAlign: 'center',
      fontSize: FONT_SIZE,
      color: colorSet.black,
      fontWeight:'600',
    },

    optionStyle: {
      flex: 1,
      //alignItems: 'center',
      padding: PADDING,
      borderTopWidth:1,
      height:60,
      borderColor:palette.lightGrey
    },

    optionTextStyle: {
      color: colorSet.black,
      fontSize: 18,
    },

    sectionStyle: {
      padding: PADDING * 2,
      borderBottomWidth: 1,
      borderBottomColor: colorSet.grey,
    },

    sectionTextStyle: {
      textAlign: 'center',
      fontSize: FONT_SIZE,
    },
    bottomContainer:{
      position:'absolute',
      bottom:0,
      right:0,
      margin:20
  },
  button:{
      backgroundColor:palette.black,
      height:44,
      width:wp('40%'),
      borderRadius:22,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:hp("2%")
  },
  buttonText:{
      color:palette.white,
      fontSize:14,
      fontWeight:'400',
      textAlign:'center',
      fontFamily:"Roobert-Medium",
  },
  backButton:{
      height:44,
      width:wp('40%'),
      borderRadius:22,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:hp("2%")
  },
  PickerButton:{
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width:'100%',
    padding: 10,
    height:50,
    borderWidth:0.6,
    borderColor:palette.grey,
    marginLeft:wp('2%'),
    marginRight:wp('2%')
  },
  PickerButtontext:{
    color: '#2d3436',
    fontSize:16,
    textAlign:'center',
    alignSelf:'center'
  },
  PickerButtonContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginRight:wp('1%'),
    marginLeft:wp('1%'),
  },
  Icon:{
    height:8,
    width:12,
    alignSelf:'center'
  },
  headerText:{
    fontSize:14,
    fontFamily:"Roobert-Medium",
    fontWeight:'400',
    margin:10,
    marginLeft:20,
    color:palette.black
  },
  btnContainer: {
    marginLeft: 5
  },
  modalButton:{
    justifyContent: 'space-between',
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: wp('5%'), 
    marginRight:wp('5%')
  },
  modalAndroidIcon:{
    position: 'absolute',
     right: 0, 
     marginRight: wp('5%'), 
     tintColor: 'black',
     height:8,
     width:12,
     alignSelf:'center' 
  }
}

