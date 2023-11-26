import {palette} from '../../theme/index';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default{
    container:{
      
        alignItems: 'center', 
        justifyContent: 'center' ,
        backgroundColor:palette.white
    },
    Logo_style:{
        width:100,
        height:100
    },
    LogoName_Style:{
        width:200,
        height:70,
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
        color:palette.black,
    },
    button:{
        backgroundColor:palette.pink,
        height:60,
        width:wp('90%'),
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:hp("4%"),
        marginBottom:hp("1%")
    },
    buttonText:{
        color:palette.white,
        fontSize:18,
        fontWeight:'500',
        textAlign:'center'
    },
    BottomIcon:{
        alignSelf:'center',
        width:16,
        height:20,
        marginRight:wp('2%'),
        position:'absolute',
        left:20
    },
    footerButton:{
        backgroundColor:palette.white,
        borderWidth:1,
        borderColor:palette.grey,
        height:55,
        width:wp('90%'),
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:hp("1%"),

    },
    footerText:{
        color:palette.black,
        fontSize:16,
        fontWeight:'500',
        textAlign:'center'
    },
    orText:{
        width:30,
        height:30,
        borderRadius:30,
        backgroundColor:palette.white,
        position:'absolute',
        top:-10,
        alignItems:'center',
        borderColor:palette.lightGrey
    },
    acknoledgeText:{
        fontSize:12,
        color:palette.black,
    },
    policText:{
        color:palette.orange,
        fontSize:12,
        textDecorationLine:'underline'
    },
    mailButton:{
           // backgroundColor:palette.smokeWhite,
            height:44,
            width:wp('40%'),
            borderRadius:22,
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
    resendMailButton:{
        height:44,
        width:wp('50%'),
        borderRadius:10,
        justifyContent:'center',
        borderWidth:1,
        borderColor:palette.grey,
        alignItems:'center',
        marginBottom:hp("2%")
},
Button:{
    backgroundColor:palette.smokeWhite,
    height:44,
    width:wp('40%'),
    borderRadius:22,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:hp("2%")
},
    mailbottomContainer:{
        position:'absolute',
        bottom:0,
        zIndex:1, 
        backgroundColor:palette.white,
        width:"100%",
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    PasswordValidation:{
       
        fontSize:14,
        fontWeight:'400',
        paddingLeft:wp('6%')
    },
    modatHeaderText:{
        
        alignSelf: 'center', 
        fontSize: 18, 
        fontWeight: '500', 

    },
    text:{
        color:palette.grey,
        alignSelf: 'center', 
        fontSize: 16, 
        fontWeight: '400', 
        marginBottom:10
    },
    nametext:{
        color:palette.black,
        alignSelf: 'center', 
        fontSize: 16, 
        fontWeight: '500', 
        marginTop:10
    },
    profileContainer:{
        borderRadius:400,
       
        height:Platform.OS==='ios'?hp('10%'): hp('14%'), 
        width: Platform.OS==='ios'?wp('21%'): hp('14%'),
 
        marginTop:hp('3%'),

    },
    profileImage:{
        alignSelf:'center',
         height:'97%',
         width:'97%',
         borderRadius:400
     },
}