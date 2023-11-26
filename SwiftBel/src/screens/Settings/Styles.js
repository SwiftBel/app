import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {
    container:{
        backgroundColor:palette.white,
        flex:1,
        marginTop:30
    },
    tabBarContainer:{
        flexDirection:'row',
        marginTop:Platform.OS==='ios'? hp('6%'):hp('3%'),
        justifyContent:'space-around' 
    },
    tabBarText:{
        textAlign:'center',
        fontSize:16
    },
    ButtonContainer:{
        height:50,
        borderBottomWidth:1,
        justifyContent:'center',
        borderColor:palette.lightGrey,
        marginLeft:wp('2%'),
        marginRight:wp('2%'),

    },
    buttonStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:15,
        paddingBottom:15
    },
    iconStyle:{width:22,height:22,marginRight:15},
    profileContainer:{
        borderRadius:400,
       
        height:Platform.OS==='ios'?hp('8%'): hp('14%'), 
        width: Platform.OS==='ios'?wp('17%'): hp('14%'),
       marginLeft:wp("5%"),
        marginTop:hp('3%'),

    },
    businessName:{
        fontSize:22,
        color:palette.black,
        fontFamily:"Roobert-Medium",
        fontWeight:'500',
        marginLeft:wp('5%'),
        marginTop:hp('2%'),
        marginBottom:hp('0.5%')
    },
    profileImage:{
       alignSelf:'center',
        height:'97%',
        width:'97%',
        borderRadius:400
    },
    card: {
     alignSelf:'center',
        justifyContent:'center',
        marginBottom:30,
        marginTop:30,
        shadowColor: '#402583',
        borderColor:palette.lightGrey,
        borderWidth:1,
        width: "88%",
        backgroundColor: '#ffffff',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1,
        borderRadius: 10,
        marginRight:10
           
      },
      text:{
        fontSize: 16, 
        marginTop: wp('2%'), 
        fontWeight:'500',
        paddingHorizontal:10,
   
      },
      starText:{
        fontSize: 18, 
        marginTop: wp('2%'), 
        fontWeight:'400',
        marginRight:10
      },
      subtext:{
        fontSize: 16, 
        fontWeight:'400',
        marginTop: wp('1.2%'), 
        paddingHorizontal:10,
       
       color:palette.grey,
       
      },
      Wrap:{
        borderRadius:10,
         borderWidth:1,
         width:80,
         height:80,
         marginRight:10,
         justifyContent:'center',
         alignItems:'center',
          borderColor:palette.pink,
    
        
       },

}