import {palette} from '../../theme/index';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default{
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' ,
        backgroundColor:palette.babyPink
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
        marginBottom:hp("2%"),
        color:palette.black
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
    BottomIcon:{
        alignSelf:'center',
        width:15,
        height:19,
        marginRight:wp('2%'),
    },
    footerButton:{
        backgroundColor:palette.white,
        borderWidth:1,
        borderColor:palette.smokeWhite,
        height:50,
        width:wp('90%'),
        borderRadius:22,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:hp("2%")
    },
    footerText:{
        color:palette.black,
        fontSize:14,
        fontWeight:'400',
        textAlign:'center'
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
}