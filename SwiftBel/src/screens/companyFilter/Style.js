import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {

    bannerContainer:{
        height:hp('18%'),
        width:wp('95%'),
        justifyContent:'center',

      
        borderTopLeftRadius:10,
        borderTopRightRadius:10
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
        marginBottom:10
    },
    MottoText:{
        alignSelf:'center',
        fontWeight:'400',
        fontSize:14,
        color:palette.grey,
        marginBottom:hp('1%')
    },
    LocationDataButton:{
        borderWidth:1,
        borderRadius:10,
        width:'90%',
        flexDirection:'row',
        height:hp('6.6%'),
        justifyContent:'space-between',
        borderColor:palette.lightGrey,
        alignItems:'center',
        alignSelf:'center',
       paddingLeft:wp('2%'),
       paddingRight:wp('2%'),
       marginTop:hp('1.5%'),
    
        backgroundColor:palette.white
    },
    locationDataText:{
        fontSize:16,
        color:palette.black,
       width:'90%'
    },
    languageText:{
        marginLeft:20,
        marginTop:10,
        fontWeight:'400',
        fontSize:14,
        color:palette.grey,
        marginBottom:hp('1%')
   
    },
    extimatedPriceText:{
        fontSize:12,
        textAlign:'center',
        marginBottom:hp('1%')
    },
    ratingContainer:{
        height: 40, 
        width:40,
        position: 'absolute', 
        top: 10, 
        right: 20, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:palette.white,
        borderRadius:10 
    },
    favourateContainer:{
        height: 40, 
        position: 'absolute', 
        top: 10, 
        right: 70, 
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor:palette.white,
        borderRadius:10 
    },
    callContainer:{
        height: 45, 
        width:45,
        justifyContent:'center',
       borderWidth:1,
        marginLeft:10,
        alignItems: 'center',
        backgroundColor:palette.white,
        borderRadius:8

    },
    servicesContainer:{
      
        marginRight:  wp('0.5%'),
        marginTop: hp('1%'),
     height:140,
      width:120,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
}