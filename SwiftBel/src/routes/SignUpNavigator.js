import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
const Stack = createNativeStackNavigator();

function SignUpNavigator() {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerBackTitleVisible: false,
                gestureEnabled: false,
                headerShown: false,
            })}
        >

            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="openingPage" component={OpeningPage} />
            <Stack.Screen name="SearchFilter" component={SearchFilter} />
            <Stack.Screen name="CompanyFilter" component={CompanyFilter} />

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

        </Stack.Navigator>
    );
}

export default SignUpNavigator;