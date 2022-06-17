import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from '../../utils/Responsive/index'
export default {

    //...........................Common Style.............................//

    container: {
        flex: 1,
        backgroundColor: palette.white,
    },
    bottomContainer: {
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        margin:20
    },
    button: {
        backgroundColor: palette.black,
        height: 44,
        width: wp('40%'),
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp("2%")
    },
    buttonText: {
        color: palette.white,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: "Roobert-Medium",
    },
    backButton: {
        height: 44,
        width: wp('40%'),
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp("2%")
    },

    dragView: {
       
        alignSelf: 'center',
        justifyContent: 'center',
        width: wp('90%'),
        borderRadius: 30,
        height: 300,
       
    },
    headerName:{
        fontSize:14,
        fontWeight:'400',
        paddingLeft:wp('5%'),
        paddingTop:wp('2%'),
        paddingBottom:wp('2%'),
        color:palette.black,
    },
}