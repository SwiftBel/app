import {palette} from '../../../theme/index';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../../utils/Responsive/index'
export default{
    container:{
        flex: 1, 
        backgroundColor:"#ffffff",
       // alignItems: 'center', 
       // justifyContent: 'center' ,
       // backgroundColor:'#000000'
    },
    Logo_style:{
        width:100,
        height:100,
        tintColor:palette.white
    },
    LogoName_Style:{
        width:200,
        height:50,
        marginBottom:hp("3%"),
        marginTop:hp("3%"),

    },
    postHeader:{
        backgroundColor:'white',
        marginTop:Platform.OS==='ios'? hp('1%'):hp('2%'),
        marginBottom:hp('1%'),
        alignItems:'center'
    },
    homepageImage:{
        height:hp('85%'),
        width:wp('100%')
    },
    bottomContainer:{
        backgroundColor:palette.white,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    bottomText:{
        fontSize:24,
        fontWeight:'400',
        fontStyle:'normal',
        marginBottom:hp("2%"),
        color:palette.white
    },
    headerText:{
        fontSize:20,
        fontFamily:'Roobert-medium',
        fontWeight:'500',
        fontStyle:'normal',
        marginBottom:hp("2%"),
        color:palette.black,
        alignSelf:'center',
        marginLeft:wp('1%')
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
        textAlign:'center'
    },
    bottomContainer:{
        zIndex:1, 
        backgroundColor:palette.white,
        width:"100%",
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        width:wp('100%'),
    },
    bottomText:{
        fontSize:14,
        fontWeight:'400',
        fontStyle:'normal',
        marginBottom:hp("2%"),
        color:palette.black
    },
    HeaderText:{
        fontSize:16,
        fontWeight:'500',
        fontStyle:'normal',
        marginBottom:hp("2%"),
        color:palette.black
    },
    keyBoardWrapper:{
        flex: 1, 
        marginBottom: hp('3%')
    },
    mailButton:{
        // backgroundColor:palette.smokeWhite,
         height:44,
         width:wp('40%'),
         borderRadius:10,
         justifyContent:'center',
         alignItems:'center',
         marginBottom:hp("2%")
 },
 mailButtonText:{
     color:palette.grey,
     fontSize:14,
     fontWeight:'400',
     textAlign:'center'
 },
 dragView:{
     
    marginLeft:wp('3%'),
      width:wp('94%'),
      borderRadius:30,
      zIndex:9999
    },
}