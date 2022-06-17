import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {
    container:{
        flex:1,
        backgroundColor:palette.white,
        marginTop:10
    },
    bottonText:{
        fontSize:14,
        fontWeight:'400',
        fontStyle:'normal',
        color:palette.white,
        textAlign:'center',
        fontFamily:"Roobert-Medium",
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
    deleteButton:{
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:26,
        height:40,
        margin:10,
        width:wp('40%')
    },
    deleteIcon:{
        width:15,
        height:15
    },
    deletText:{
        textAlign:'center',
        alignSelf:'center',
        marginLeft:5,
        fontSize:16,
        color:'black',
        fontFamily:"Roobert-Medium",
    }
}