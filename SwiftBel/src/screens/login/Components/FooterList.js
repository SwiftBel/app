import * as React from 'react';
import {
    ButtonWithIcon
} from '../../../components/index'
import { View,Text, Alert} from 'react-native';
import {ListData} from './ListData'
import Style from '../Style'
import Constants from '../../../utils/Constant';
import {_googleLogin,_appleLogin} from '../../../store/actions/Login.action'
import {useDispatch} from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { AppleButton,appleAuth } from '@invertase/react-native-apple-authentication';
const FooterList = (props) => {
const {Authentication}=Constants
const {navigation}=props
const dispatch = useDispatch();
const [indicator,setIndicatior]=React.useState(false)
GoogleSignin.configure({
    webClientId: '542308296429-j962o48c4oao363p8583hcj4m86u7m51.apps.googleusercontent.com',
  });
  const signinwithgoogle= async()=>{
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo,"userinfo")
      if (userInfo) {
        const data = await GoogleSignin.getTokens();
          setIndicatior(true)
          const res = await dispatch(_googleLogin(userInfo));
          if (res.status == true) {
              (res.isServiceProvider==true)?
              props.navigation.navigate('Dashboard'):
              props.navigation.navigate('Home')
              setIndicatior(false);
          }
          else {
            Alert.alert(
              res.message)
          
              setIndicatior(false);
          }

      }
  }
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
  
    // Create a Firebase credential from the response
    const { identityToken, nonce,email,fullName, } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
    console.log(appleCredential,email ,"credential")
    console.log(appleAuthRequestResponse,"-------")
    console.log(identityToken,"////////")
    const res = await dispatch(_appleLogin(appleAuthRequestResponse));
    if (res.status == true) {
        (res.isServiceProvider==true)?
        props.navigation.navigate('Dashboard'):
        props.navigation.navigate('Home')
        setIndicatior(false);
    }
    else {
      Alert.alert(
        res.message)
    }
  }
    return (
        <View>
            {
                ListData.map((item)=>{
                    return(
                        <ButtonWithIcon
                        ButtonLeftText= {item.name}
                        buttonLeftTextStyle={Style.footerText}
                        ButtonStyle={Style.footerButton}
                        imageStyle={Style.BottomIcon}
                        imageSource={item.icon}
                        key={item.key}
                        onClick={()=>item.name=='Email'?navigation.navigate('LoginMail'):item.name=='Google'?signinwithgoogle():onAppleButtonPress()}
                      /> 
                    )
                })
            }
             <Text style={[Style.acknoledgeText,{marginBottom:20,textAlign:'center',lineHeight:20}]}>
                 {Authentication.BytappingCreateanAccount}
                <Text style={Style.policText}>
                {Authentication.TermsofService}
                </Text>
                <Text style={Style.policText}>
                {Authentication.PaymentsTermsofService}
                </Text>
                <Text style={Style.acknoledgeText}>
                {Authentication.And}
                </Text>
                <Text style={Style.policText}> 
                {Authentication.NondiscriminationPolicy}
                </Text>
                <Text style={Style.acknoledgeText}>
                {Authentication.acknowledge} 
                </Text>
                <Text style={Style.policText}>
                {Authentication.PrivacyPolicy}
                </Text>
                </Text>
        </View>
    );
}
export default FooterList;