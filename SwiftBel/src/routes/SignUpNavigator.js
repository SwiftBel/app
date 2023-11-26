import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Home/Welcome';
import SignUp from '../screens/signUp/Index';
import MailSignUp from '../screens/signUp/MailSignUp';
import VerifyMail from '../screens/signUp/MailSignUp/VerifyMail';
import PasswordSetup from '../screens/signUp/MailSignUp/PasswordSetup';
import Profile from '../screens/CreateUserProfile';
import MobileNumber from '../screens/CreateUserProfile/MobileNumber';
import OtpVerification from '../screens/CreateUserProfile/OtpVerification';
import HomePage from '../screens/Home/Homepage';
import DashBoard from '../screens/DashBoard/Index';
import Login from '../screens/login';
import LoginMail from '../screens/login/loginWithMail/loginMail';
import OpeningPage from '../screens/DashBoard/homepage/index'
import SearchFilter from '../screens/searchFilter';
import CompanyFilter from '../screens/companyFilter';
import spProfile from '../screens/profile/Profile'
import ConfirmPayment from '../screens/confirmPayment';
import LocationTraker from '../screens/searchFilter/LocationTraker';
import LocationDestinationTraker from '../screens/searchFilter/DestinationLocationTracker';
import Estimate from '../screens/estimate/Estimate';
import ScreenSplash from '../screens/DashBoard/homepage/SplashScreen';
import GetPrice from '../screens/estimate/GetPrice';
const Stack = createStackNavigator();

function SignUpNavigator(props) {
    const [index, setIndex] = React.useState(0);
    return (
        <Stack.Navigator
       // mode="modal"
       
        screenOptions={{
       
        headerBackTitleVisible: false,
        gestureEnabled: false,
        headerShown: false,
        }}>
 <Stack.Screen   options={{
   gestureEnabled:false
 }}  name="ScreenSplash" component={ScreenSplash} />
            <Stack.Screen  name="DashBoard" component={DashBoard} />
            <Stack.Screen name="openingPage"  options={{
                animationEnabled:true,
                
          cardStyle: {
            backgroundColor: 'transparent',
          },
          cardStyleInterpolator: ({current}) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}  >{props=><OpeningPage {...props}index={index} setIndex={setIndex}/>}</Stack.Screen>
            <Stack.Screen  options={{
        
          cardStyleInterpolator: ({current}) => ({
            cardStyle: {
              opacity: current.progress,
            
            },
          }),
        }} name="SearchFilter"  >

{props => <SearchFilter {...props} index={index} setIndex={setIndex} />}
        </Stack.Screen>
            <Stack.Screen name="CompanyFilter" component={CompanyFilter} />
            <Stack.Screen name="Estimate" component={Estimate} />
            <Stack.Screen name="getPrice" component={GetPrice} />

            {/* {.............................SignUp-Authentication........................} */}


            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name='MailSignUp' component={MailSignUp} />
            <Stack.Screen name='VerifyMail' component={VerifyMail} />
            <Stack.Screen name='PasswordSetup' component={PasswordSetup} />
            {/* {.............................Profile........................} */}

            <Stack.Screen name='Home' component={Welcome} />
            <Stack.Screen name="homepage" component={HomePage} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="MobileNumber" component={MobileNumber} />
            <Stack.Screen name="Otpverification" component={OtpVerification} />

            {/* {.............................Login-Authentication........................} */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="LoginMail" component={LoginMail} />

            {/* ...............................SpProfile.............................*/}
            <Stack.Screen name="SpProfile" component={spProfile} />
            <Stack.Screen name="ConfirmPayment" component={ConfirmPayment} />
            <Stack.Screen name="LocationTraker" component={LocationTraker} />
            <Stack.Screen name="LocationDestinationTraker" component={LocationDestinationTraker} />

        </Stack.Navigator>
    );
}

export default SignUpNavigator;