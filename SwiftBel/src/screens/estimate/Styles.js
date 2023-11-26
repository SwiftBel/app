import { Platform } from "react-native";
import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'

export default {
 container:{
    marginLeft:wp('1%'),
    marginRight: wp('1%'),
    backgroundColor: 'white',
    borderBottomWidth:1,
    borderBottomColor:palette.lightGrey
 },
 reviewContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:wp('2%'),
    marginRight:wp('2%')
 },
 logoContainer:{
    height:hp('6%'),
    width:wp('13%'),
    borderRadius:28,
    backgroundColor:palette.babyPink,
    alignItems:'center',
    justifyContent:'center',
    marginRight:wp('2%')
 },
 logoText:{
fontSize:16,
fontWeight:'500',
color:palette.pink
 },
 image_Style:{
    height:hp('5%'),
    width:wp('11%'),
    borderRadius:hp('5%')+wp('11%')/2,
 },
 nameText:{
    color:palette.black,
    fontWeight:'500',
    fontSize:16
 },
 comentText:{
    marginLeft:wp('2%'),
    marginRight:wp('2%'),
    marginBottom:hp('3%'),
    marginTop:hp('1%'),
    color:palette.black
 },
 ButtonContainer:{

   justifyContent:'center',
   borderColor:palette.lightGrey,
   marginLeft:wp('2%'),
   marginRight:wp('2%')
},
buttonStyle:{
   marginHorizontal:15,
   flexDirection:'row',
   justifyContent:'space-between'
},
iconStyle:{width:30,height:30,marginTop:10},

}