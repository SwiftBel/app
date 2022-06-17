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
        backgroundColor:"#000000"
    },
    Logo_style:{
        width:100,
        height:100,
        tintColor:palette.white
    },
    LogoName_Style:{
        width:240,
        height:60,
        marginBottom:hp("5%")
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
    bottomHomepageText:{
        fontSize:18,
        fontWeight:'400',
        fontStyle:'normal',
        marginBottom:hp("2%"),
        color:palette.black,
        alignSelf:'flex-start',
        marginLeft:wp('1%')
    },
    button:{
        backgroundColor:palette.black,
        height:44,
        width:wp('90%'),
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:hp("4%")
    },
    buttonText:{
        color:palette.white,
        fontSize:14,
        marginLeft:wp('3%'),
        fontWeight:'400',
        textAlign:'center',
        marginLeft:wp('33%'),
    },
    BottomIcon:{
        width:12,
        height:20,
        marginRight:wp('2%'),
        marginLeft:wp('33%'),
    }
}