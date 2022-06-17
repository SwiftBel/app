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
        marginRight:wp('2%')
    },
    buttonStyle:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    iconStyle:{width:25,height:25}

}