import { Dimensions, Platform, StyleSheet } from 'react-native'
import { palette } from '../../theme'

const { height, width } = Dimensions.get('window')
const PADDING = 8
const BORDER_RADIUS = 20
const FONT_SIZE = 18
const OPTION_CONTAINER_HEIGHT = 180
const colorSet = palette

export default {
 
    overlayStyle: {
      width,
      height,
      backgroundColor: '#00000059',
      borderWidth:1
    },

    optionContainer: {
      borderRadius: BORDER_RADIUS,
      width: width * 0.95,
      backgroundColor: "#F5F5F5",
      //height:40,
      left: width * 0.02,
      top: Platform.OS === 'android'?(height - OPTION_CONTAINER_HEIGHT) / 1.25 : (height - OPTION_CONTAINER_HEIGHT) / 1.15,
    },

    cancelContainer: {
      left: width * 0.02,
      top: Platform.OS === 'android'?(height - OPTION_CONTAINER_HEIGHT) / 1.20 - 10:(height - OPTION_CONTAINER_HEIGHT) / 1.15 + 10,
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
    
}

