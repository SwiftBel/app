import { Dimensions } from "react-native";
import { palette } from "../../../theme";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../../../utils/Responsive/index'
const { width, height } = Dimensions.get('screen');
export default {
  container: {
    height: height,
    backgroundColor: palette.white,
  },
  serviceCrousalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  topImageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 200,
    justifyContent: 'center',
  },
  serviceImg: {
    width: 35,
    height: 35,
    marginBottom: 10,
    tintColor: '#000'
  },

  headerText: {
    fontSize: 26,
    marginTop: wp('9%'),
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: 10,
    marginBottom: hp('3%'),
    lineHeight: 40,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    width: wp('90%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.white,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 30,
    paddingLeft:15,
    paddingRight:15,
    borderColor: palette.lightGrey,
    borderWidth: 1
  },
  searchBarContainer2: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    width: wp('91%'),
    alignSelf:'center',
    padding:15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: 10,
    borderColor: palette.lightGrey,
    backgroundColor: '#ffffff',
   
    borderWidth: 1
  },
  servicesContainer: {
    marginRight: wp('7%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PlaceContainer: {
    marginRight: wp('5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    borderColor: palette.lightGrey
  },
  card: {
    flex:1,
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    borderColor: palette.lightGrey,
    borderRadius:5,
    borderWidth: 1,
    width: width - 130,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    
    marginRight: 15

  },
  text: {
    fontSize: 16,
    marginTop: wp('1.5%'),
    fontWeight: '500',
    paddingHorizontal: 5,

  },
  searchText:{
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 5,
  },
  starText: {
    fontSize: 18,
    marginTop: wp('2%'),
    fontWeight: '400',
    marginRight: 10
  },
  subtext: {
    fontSize: 16,

    marginTop: wp('1.2%'),
    paddingHorizontal: 5,

    color: palette.grey,

  },
  cardWrap: {

    marginHorizontal: 18,
    borderColor: palette.lightGrey,
  },
  bookingcard: {
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: palette.white,
    width: 330,
    right: 0,
    top: 100,
    borderColor: palette.lightGrey,

    padding: 15
  },
  Wrap: {
    borderRadius: 10,
    borderWidth: 1,
    width: 80,
    height: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: palette.pink,
  },
  flexCard:{
    flex:1,
    flexDirection:'row',
    paddingTop:15,
    paddingBottom:15,
    marginTop:20
  },
  flexCard2:{
    flex:1,
    flexDirection:'row',
    marginBottom:20
  },
  firstCardWrap:{
    borderRadius:10,
    padding:15,
    width:'48%',
    marginRight:15, 
    backgroundColor:palette.smokeWhite
  },
  secondCardWrap:{
    borderRadius: 10,
    padding: 15, 
    backgroundColor: palette.smokeWhite,
    width:wp('21.2%'),
    
  },
  serviceCardWrap:{
    borderRadius: 10,
    padding: 20, 
    borderWidth:1,
    borderColor: palette.lightGrey,   
   justifyContent:'center',
     width:wp('27.5%'),height:hp('12%')
  },
  cardImg:{
    width: 50, 
    height: 53,
    alignSelf:'flex-end',
    shadowColor:'#000',
    shadowOffset:{width:0,height:3},
    shadowOpacity:0.2,
    shadowRadius:2
  },
  card1Text:{
    fontSize:18,
    fontWeight:'400'
  },
  card2Text:{
    fontSize: 14, 
    fontWeight: '400', 
    textAlign: 'center', 
    marginTop: 5, 
  },
  scrollStyle:{
    width:'100%',
    position:'absolute',
    zIndex:10000,
    top:0
  },
  mapCard:{
    flexDirection: 'row', 
    borderColor: palette.lightGrey, 
    borderBottomWidth: 1 ,
  },
  mapCardImg:{
    width: 80, 
    height: 80, 
    margin: 5
  },
  mapWrap:{
    height: 270, 
    borderRadius: 15,
     paddingTop: 30,
      paddingBottom: 20, 
      flex: 1 
  }
}