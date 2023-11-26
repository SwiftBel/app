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
const OPTION_CONTAINER_HEIGHT = 770
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
      width: width ,
      backgroundColor:palette.white,
      height:780,
      left: width * 0.00,
      flex:1
     
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
        fontSize: 22, 
        fontWeight: '500', 
        marginRight: wp('10%'),   
        marginBottom:hp('2%')
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
    button:{
        backgroundColor:palette.pink,
        height:64,
        width:wp('90%'),
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:hp("2%")
    },
    buttonText:{
        color:palette.white,
        fontSize:16,
        fontWeight:'500',
        textAlign:'center'
    },
    tabBarContainer:{
      flexDirection:'row',
      marginTop:Platform.OS==='ios'? hp('6%'):hp('3%'),
      justifyContent:'space-around' 
  },
  tabBarText:{
     
      fontSize:13
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
     
      width:'95%',

      marginLeft:wp('1%'),
      marginRight:wp('1%')
    },
    PickerButtontext:{
      color: '#2d3436',
      fontSize:16,
      textAlign:'center',
      alignSelf:'center'
    },
    card: {
      alignSelf:'center',
         justifyContent:'center',
         marginBottom:15,
        
         shadowColor: '#402583',
         borderColor:palette.lightGrey,
         borderWidth:1,
         width: "90%",
         backgroundColor: '#ffffff',
         shadowOffset: {
           width: 0,
           height: 0,
         },
         shadowOpacity: 0.1,
         shadowRadius: 6,
         elevation: 1,
         borderRadius: 10,
        padding:10,
      
            
       },
    PickerButtonContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
    
    },
    Icon:{
      height:8,
      width:12,
      alignSelf:'center'
    },
    headerText:{
      fontSize:12,
      fontFamily:"Roobert-Medium",
      fontWeight:'400',
      marginLeft:5,
      marginBottom:8,
      color:palette.grey
    },
    mainHeaderText:{
      fontSize:30,
      fontFamily:"Roobert-Medium",
      fontWeight:'400',
      marginLeft:20,
      marginBottom:20,
      color:palette.black
    },
    btnContainer: {
     
    },
    modalButton:{
      justifyContent: 'space-between', 
      flexDirection: 'row', 
      alignItems: 'center',
      marginTop:hp('2%'), 
 
      marginLeft:wp('2%'), 
      marginRight: wp('44%'),
      // position:'absolute',
      // bottom:0
    },
    datePicker: {
      width: 320,
      height: 220,
  },
  btnContainer: {
    marginLeft: 5
    
},
listofServicesText:{
  fontSize:14,
  marginBottom:hp('3%'),
  width:'100%',
  color:palette.grey
},
listofServicesHeader:{
  marginLeft:wp('5%'), 
  fontSize: 18, 
  fontWeight: '500',
},


Icon:{
  height:10,
  width:10,
  alignSelf:'center'
},
btnContainer: {
  marginLeft: 5,
  width:'94%'
},
dragView:{
marginLeft:wp('4%'),
  width:wp('88%'),
  borderRadius:30,
  zIndex:1
},
dragViewDescription:{
  position:'absolute',
   alignSelf:'center',
   justifyContent:'center',
   width:wp('90%'),
   borderRadius:30,
   zIndex:1
},
//................................carpetCleaningModal...........................
modalContainer:{
  borderRadius: 25,
   width: wp('90%'), 
   marginLeft:wp('3%'), 
   marginTop: wp('2%'), 
   borderWidth: 1, 
   borderColor: palette.lightGrey 
},
modaluntickButton:{
  margin: wp('2%'), 
  height: 20, 
  width: 20, 
  borderWidth: 1, 
  borderRadius: 5, 
  borderColor: palette.grey 
},
modalTickButton:{
  margin: wp('2%'), 
},
switchToggle:{
  flexDirection:'row',
  margin:20,
  marginLeft:20,
  alignItems:'center',
  justifyContent:'space-around'
}

}

