import {Dimensions, PixelRatio, StyleSheet} from 'react-native';
import { palette } from '../../theme';

let {height} = Dimensions.get('window');
let {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  viewOuter: {
    flexDirection: 'row',
  },
  viewBtnLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight:'500',
    height: PixelRatio.roundToNearestPixel((height * 4) / 100),
    width: PixelRatio.roundToNearestPixel((width * 8.5) / 100),
    borderWidth: 1,
 
    borderRadius: PixelRatio.roundToNearestPixel((height * 5) / 100),
  //  borderBottomLeftRadius: PixelRatio.roundToNearestPixel((height * 1) / 100),
  },
  viewBtnRight: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.grey,
    height: PixelRatio.roundToNearestPixel((height * 4) / 100),
    width: PixelRatio.roundToNearestPixel((width * 8.5) / 100),
    borderRadius: PixelRatio.roundToNearestPixel((height * 5) / 100),
  },
  viewTextInput: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginLeft:5,
    marginRight:5,
    height: PixelRatio.roundToNearestPixel((height * 4) / 100),
    width: PixelRatio.roundToNearestPixel((width * 8) / 100),
  },
  labelStyle:{
    fontSize: 14,
    textAlign:'center',
    
  },
  btnLabelStyle:{
    fontSize: 18,
    fontWeight:'500'
  
  }
});
export default styles;