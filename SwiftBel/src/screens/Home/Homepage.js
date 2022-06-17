
import * as React from 'react';
import {
Chevronleft,
Homepage,
} from '../../assets/index';
import {
ButtonWithIcon
} from '../../components/index'
import { View ,Image,Text } from 'react-native';
import Style from './Style'
import Constants from '../../utils/Constant';
function HomePage(props) {
 

    return (
      <View style={Style.container}>
          <View style={{flex:1}}>
      <Image
        source={Homepage}
        style={Style.homepageImage}
        resizeMode='cover'
        />
        </View>
        <View style={Style.bottomContainer}>
                <View style={{ margin: 20,alignItems:'center',alignSelf:'center', width:'100%',marginTop:40}}>
                <Text style={Style.bottomHomepageText}>{Constants.Authentication.Createacompanysteps}</Text>
               <ButtonWithIcon
                        ButtonText= {Constants.Authentication.Letsdoit}
                        buttonTextStyle={Style.buttonText}
                        ButtonStyle={Style.button}
                        imageStyle={Style.BottomIcon}
                        imageSource={Chevronleft}
                        onClick={()=>props.navigation.navigate('profile')}
                      /> 
                    </View>
                </View>
      </View>
    );
  }
  export default HomePage;