//import SplashScreen from 'react-native-splash-screen';
import * as React from 'react';
import {
    SwiftBel
} from '../../assets/index';
import {
    Button,
} from '../../components/index'
import Constants from '../../utils/Constant';
import { View, Text, Image, StatusBar } from 'react-native';
import Style from './Style'
import FooterList from './Components/FooterList';
import EncryptedStorage from 'react-native-encrypted-storage';
const SignUp = (props) => {

    // React.useEffect(()=>{
    //    // init();
    //     SplashScreen.hide()
    //   },[])

const init=async()=>{
    const token = await EncryptedStorage.getItem("access_token");
    const isProfile=JSON.parse(token)
    console.log(isProfile,"profile")
    isProfile.token?isProfile.isServiceProvider?
    props.navigation.navigate('Dashboard'): props.navigation.navigate('profile'):null
}
const [change,setChange]=React.useState()
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
                <Text style={Style.bottomText}>{Constants.Authentication.Signupwith}</Text>
                <FooterList navigation={props.navigation}/>
                    <Text style={Style.bottomText}>{Constants.Authentication.haveanaccount}</Text>
                    <Button
                        buttonView={{ alignItems: 'center' }}
                        ButtonText={Constants.Authentication.Login}
                        buttonTextStyle={Style.buttonText}
                        button={Style.button}
                        onPress={()=> props.navigation.navigate('Login')}
                    />
                </View>
            </View>
        </View>
    );
}
export default SignUp;