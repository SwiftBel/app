import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default{
    tabBarContainer:{
        flexDirection:'row',
        marginTop:hp('2%'),
        justifyContent:'space-around' 
    },
    tabBarText:{
        textAlign:'center',
        fontSize:16
    },
}