import { palette } from "../../theme";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
export default {
Buttoncontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginRight:wp('1%'),
    marginLeft:wp('1%'),
},
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
   // width:150,
    padding: 10,
    height:50,
    borderWidth:0.6,
    borderColor:palette.grey,
    marginLeft:wp('2%'),
    marginRight:wp('2%')
  },
  buttonText: {
    color: '#2d3436',
    fontSize:16,
    textAlign:'center',
    alignSelf:'center'
  },
  headerText:{
    fontSize:18,
    fontWeight:'400',
    margin:10,
    color:palette.black
  },
  Icon:{
    height:9,
    width:16,
    alignSelf:'center'
  }
}