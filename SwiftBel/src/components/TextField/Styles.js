import { palette } from '../../theme'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default{

    container:{
        justifyContent:'space-between',
        borderWidth:1,
        width:wp('90%'),
        height:60,
        paddingLeft:wp('1%'),
        flexDirection:'row',
        paddingRight:wp('4%')
    },
    Logo_Style:{
        width:wp('4%'),
        height:hp('4%'),
        alignSelf:'center'
    },
    searchBarContainer:{
alignSelf:'center',
        flexDirection: 'row', 
        height: 50, 
        width: wp('80%'), 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        backgroundColor: palette.white,
        borderRadius: 15, 
        
     
    },
    topImageContainer:{
        flex:1,
        height:hp('20%'),
        width:wp('100%'),
        justifyContent:'center',
    },
    PasswordValidation:{
       
        fontSize:14,
        fontWeight:'400',
      
   
        paddingTop:wp('2%')
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