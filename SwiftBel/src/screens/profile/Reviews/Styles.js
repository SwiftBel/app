import { Platform } from "react-native";
import { palette } from "../../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../../utils/Responsive/index'

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
    justifyContent:'center',
    marginRight:wp('1%')
 },
 image_Style:{
    height:hp('5%'),
    width:wp('11%'),
    borderRadius:hp('5%')+wp('11%')/2,
 },
 nameText:{
    color:palette.black,
    fontWeight:'500'
 },
 comentText:{
    marginLeft:wp('2%'),
    marginRight:wp('2%'),
    marginBottom:hp('3%'),
    marginTop:hp('1%'),
    color:palette.black
 }

}