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
const OPTION_CONTAINER_HEIGHT = 220
const colorSet = palette

export default {
 
    overlayStyle: {
      width,
      height,
      backgroundColor: '#00000059',
      borderWidth:1,
      marginLeft:-20
    },

    optionContainer: {
      borderRadius: BORDER_RADIUS,
      width: width ,
      backgroundColor:palette.white,
      height:220,
      left: width * 0.00,
      top: Platform.OS === 'android'?(height - OPTION_CONTAINER_HEIGHT) / 1.25 : (height - OPTION_CONTAINER_HEIGHT) / 1,
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
    modatHeaderText:{
        alignSelf: 'center', 
        fontSize: 16, 
        fontWeight: '500', 
        marginRight: wp('10%')   
    },

    optionStyle: {
      flex: 1,
      //alignItems: 'center',
      padding: PADDING,
      borderTopWidth:1,
      height:260,
      width:wp('47.2%'),
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
  
    Icon:{
      height:8,
      width:12,
      alignSelf:'center'
    },
    headerText:{
      fontSize:18,
      fontWeight:'500',
      margin:10,
      marginLeft:wp('5%'),
      color:palette.black
    },
    flexRowContainer:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginLeft: wp('1%'), 
        marginRight: wp('2%'),
        marginTop:hp('4%') ,
        borderBottomWidth:1,
      borderColor:palette.lightGrey
    }
,
 container:{
       flex: 1, 
        backgroundColor:palette.white,
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
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:hp("2%"),
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
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:hp("2%"),
        backgroundColor:palette.smokeWhite
    },
// ........................LocationStyle.........................//

    locationBottomContainer:{
        flexDirection:'row',
        margin:20,
        marginBottom:hp('2%'),
        marginRight:wp('3%'),
        alignSelf:'center'
    },


}

