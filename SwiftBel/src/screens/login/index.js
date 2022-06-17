import * as React from 'react';
import {
    SwiftBel
} from '../../assets/index';
import {
    Button,
} from '../../components/index'
import Constants from '../../utils/Constant';
import { View, Text, Image } from 'react-native';
import Style from './Style'
import FooterList from './Components/FooterList';

const Login = (props) => {

    return (
        <View style={Style.container}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Image
                source={SwiftBel}
                style={Style.LogoName_Style}
                resizeMode='contain'
            />
            </View>
            <View style={Style.bottomContainer}>
                <View style={{ margin: 30,alignItems:'center',marginTop:40}}>
                <Text style={Style.bottomText}>{Constants.Authentication.LogInwith}</Text>
                <FooterList navigation={props.navigation}/>
                    <Text style={Style.bottomText}>{Constants.Authentication.Donthaveanaccount}</Text>
                    <Button
                        buttonView={{ alignItems: 'center' }}
                        ButtonText={Constants.Authentication.signUp}
                        buttonTextStyle={Style.buttonText}
                        button={Style.button}
                        onPress={()=> props.navigation.navigate('SignUp')}
                    />
                </View>
            </View>
        </View>
    );
}
export default Login;