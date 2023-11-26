import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {

    cardContainer:{
        backgroundColor:palette.white,
        marginBottom:15,
       padding:15
       // marginBottom:70
    },
    bannerImage_Style:{
        height:"100%",
        width:'100%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    profileContainer:{
    
       
        borderWidth:5,
        justifyContent:'center',
        borderRadius:300,
        borderColor:palette.white,
        alignItems:'center',
        marginLeft:wp("2%"),
        marginTop:hp('-8.5%'),
        height:Platform.OS==='ios'?hp('11%'): hp('13%'), 
        width: Platform.OS==='ios'?wp('24%'): hp('13%'),
        
    },
    profileButton:{
          borderWidth:5,
        justifyContent:'center',
        borderRadius:300,
        borderColor:palette.white,
        alignItems:'center',
        marginLeft:wp("1%"),
        marginTop:hp('0.8%'),
        height:Platform.OS==='ios'?hp('11%'): hp('13%'), 
        width: Platform.OS==='ios'?wp('24%'): hp('13%'),
    },
    profileImage:{
       alignSelf:'center',
        height:'97%',
        width:'97%',
        borderRadius:400
    },
    headerContainer:{
        height: 100, backgroundColor: palette.white, elevation: 3,
        shadowColor: palette.lightGrey,
        shadowRadius: 1.22,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 1.0
    },
    headerText:{
        fontSize: 22, 
        marginBottom:10,
        fontWeight:'500',
        lineHeight:40
    },
    profileViewContainer:{
        borderRadius:400,
        backgroundColor:'white',
        height:Platform.OS==='ios'?hp('14%'): hp('14%'), 
        width: Platform.OS==='ios'?wp('28%'): hp('14%'),
        alignSelf:'center',
        marginTop:hp('-7%'),
    },
    companyNameText:{
        marginLeft:20,
         fontWeight:'500',
         fontSize:18,
         color:palette.black,
         marginBottom:hp('3%')
     },
     MottoText:{
         alignSelf:'center',
         fontWeight:'400',
         fontSize:14,
         color:palette.grey,
         marginBottom:hp('1%')
     },
    languageText:{
        alignSelf:'center',
        fontWeight:'400',
        fontSize:14,
        color:palette.grey,
        marginBottom:hp('3%')
    },
    extimatedPriceText:{
        fontSize:12,
        textAlign:'center',
        marginBottom:hp('1%')
    },
    Wrap:{
       borderRadius:10,
        borderWidth:1,
        width:100,
        height:100,
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',
         borderColor:"#7DB164",
         backgroundColor:'#F5F9F3'
      },
      
      flexWrap:{
        flexDirection:'row',
  

      },
      text:{
        fontSize: 16, 
        marginTop: wp('1%'),
        marginBottom:hp('0.5%'), 
        fontWeight:'400',
   
      },
      starText:{
        fontSize: 14, 
        marginTop: wp('2%'), 
        fontWeight:'400',
        marginRight:10
      },
      subtext:{
        fontSize: 14, 
        fontWeight:'400',
        marginTop: wp('1.2%'), 
        paddingHorizontal:10,
       
       color:palette.grey,
       
      },
      subValue:{
        fontSize: 16, 
        fontWeight:'400',
        marginTop: wp('1.2%'), 
     
       
       color:palette.grey,
      },
      buttonStyle:{
        marginHorizontal:15,
        flexDirection:'row',
        justifyContent:'space-between'
     },
     iconStyle:{
         width:30,
         height:30,
        marginTop:hp('1%')
        },
     button:{
        backgroundColor:palette.pink,
        height:60,
        width:wp('90%'),
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:hp("2%")
    },
    buttonText:{
        color:palette.white,
        fontSize:16,
        fontWeight:'400',
        textAlign:'center'
    },
    acknoledgeText:{
        fontSize:14,
        color:palette.black,
    },
    policText:{
        color:palette.orange,
        fontSize:14,
        textDecorationLine:'underline'
    },
}