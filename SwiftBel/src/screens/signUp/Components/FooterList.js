import * as React from 'react';
import {
    ButtonWithIcon
} from '../../../components/index'
import { View,Text, Alert} from 'react-native';
import {ListData} from './ListData'
import Style from '../Style'
import Constants from '../../../utils/Constant';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux'
import {google_Signup,Apple_SignUp} from '../../../store/actions/Signup.action'
import { AppleButton,appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import ButtonWithImageIndicator from '../../../components/Button/ButtonWithIconIndicator';
const FooterList = (props) => {
const {Authentication}=Constants
const {navigation}=props
const dispatch = useDispatch();
const [indicator,setIndicatior]=React.useState(false)
GoogleSignin.configure({
  
    webClientId: '542308296429-j962o48c4oao363p8583hcj4m86u7m51.apps.googleusercontent.com',
    scopes:[
     ' https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
      ' https://www.googleapis.com/auth/business.manage'
    ]
  });
  const signinwithgoogle= async()=>{
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo,"userinfo")
      if (userInfo) {
        const data = await GoogleSignin.getTokens();
        console.log(data,"datata")
        setIndicatior(true)
        const res= await dispatch(google_Signup(data))
        if (res.status === "success")
      {  props.navigation.navigate('Home')
        setIndicatior(false)}
        else
        {
          Alert.alert(
            res.message)
          setIndicatior(false)
        }
      }
//   // Create a Google credential with the token
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);


//   // Sign-in the user with the credential
//   navigation.navigate('Home');
//   const user= auth().signInWithCredential(googleCredential);
//   user.then(re=>{
//       console.log(re)
//   })
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
    const { identityToken, nonce,email,fullName, } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    auth().signInWithCredential(appleCredential);

    const res= await dispatch(Apple_SignUp(appleAuthRequestResponse))

    console.log(appleCredential,email ,"credential")
    console.log(appleAuthRequestResponse,"-------")
    console.log(identityToken,"////////")
    if(res.status===true)
    {
     
     props.navigation.navigate('Home')
    }
  }
    return (
        <View style={{paddingTop:30}}>
            {
                ListData.map((item)=>{
                    return(
                      props?.type?item.name=='Google'?
                        <ButtonWithImageIndicator
                        ButtonLeftText= {`Continue with ${item.name}`}
                        buttonLeftTextStyle={Style.footerText}
                        ButtonStyle={Style.footerButton}
                        imageStyle={Style.BottomIcon}
                        imageSource={item.icon}
                        key={item.key}
                        indicator={item.name=='Google'?indicator:false}
                        onClick={()=>item.name=='Email'?navigation.navigate('MailSignUp'):item.name=='Google'?signinwithgoogle():onAppleButtonPress()}
                      /> :null:
                      <ButtonWithImageIndicator
                      ButtonLeftText= {`Continue with ${item.name}`}
                      buttonLeftTextStyle={Style.footerText}
                      ButtonStyle={Style.footerButton}
                      imageStyle={Style.BottomIcon}
                      imageSource={item.icon}
                      key={item.key}
                      indicator={item.name=='Google'?indicator:false}
                      onClick={()=>item.name=='Email'?navigation.navigate('MailSignUp'):item.name=='Google'?signinwithgoogle():onAppleButtonPress()}
                    />
                    )
                })
            }
             {/* <Text style={[Style.acknoledgeText,{marginBottom:20,textAlign:'center',lineHeight:20}]}>
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
                </Text> */}
        </View>
    );
}
export default FooterList;