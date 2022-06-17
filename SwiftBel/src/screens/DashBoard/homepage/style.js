import { palette } from "../../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../../utils/Responsive/index'

export default{
    container:{
        flex:1,
        backgroundColor:palette.white,
    },
    topImageContainer:{
        flex:1,
        height:hp('20%'),
        width:wp('100%'),
        justifyContent:'center',
    },
    headerText:{
        fontSize: 24, 
        margin: wp('3%'), 
        textAlign: 'center' ,
        marginBottom:hp('3%')
    },
    searchBarContainer:{
        flex: 1, 
        flexDirection: 'row', 
        height: 50, 
        width: wp('80%'), 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        backgroundColor: palette.white,
        borderRadius: 25, 
        borderColor: palette.grey, 
        borderWidth: 1 
    },
    servicesContainer:{
        marginLeft: wp('0.5%'),
        marginRight:  wp('0.5%'),
        marginTop: hp('2%'),
        borderRadius: 26,
        width: wp('45%'),
        height: 250,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
}