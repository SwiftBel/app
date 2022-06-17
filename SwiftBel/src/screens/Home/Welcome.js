
import * as React from 'react';
import {
Logo,
LogoName,
Chevronleft,
SwiftBel,
welcome
} from '../../assets/index';
import { View ,Image,Text } from 'react-native';
import Style from './Style'
import Constants from '../../utils/Constant';
function Welcome(props) {

  React.useEffect(()=>{
    setTimeout(() => {
      props.navigation.navigate('homepage');
    }, 3000);
  },[])
    return (
      <View style={Style.container}>
      <Image
        source={welcome}
        style={{width:'100%',height:'100%',alignSelf:'center'}}
        resizeMode='cover'
        />
      </View>
    );
  }
  export default Welcome;