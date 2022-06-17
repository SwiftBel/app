import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from '../../components';
import ProfileHeader from '../../components/Header/ProfileHeader';
import InputPin from '../../components/InputPin/InputPin';
import { palette } from '../../theme';
import Constants from '../../utils/Constant';
import BottomButton from './components/BottomButton';
import Style from './Style'
import { verifyotp } from '../../store/actions/Profile.action'
import { useSelector, useDispatch } from 'react-redux'
const OtpVerification = (props) => {
    const data = useSelector(state => state.Profile)
    const [otpPin, setOtpPin] = useState('')
    const [error,setError] = useState('')
    const [isIndicator, setIsIndicator] = React.useState(false)
    const dispatch = useDispatch();

    const onsubmit = async () => {
        setIsIndicator(true)
        const res = await dispatch(verifyotp(otpPin))
        if (res.status == true) {
            setError('')
            props.navigation.navigate('DashBoard')
            setIsIndicator(false);
        }
        else
            {setIsIndicator(false);
            setError(res.data)
    }}
    const resendEmail=async ()=>{
        await dispatch(verifyotp(otpPin))
    }
    return (
        <View style={Style.container}>
            <ProfileHeader rightText='You’re almost there!' />
            <Text style={{ alignSelf: 'center', margin: 10,color:palette.black }}>{`Enter the verification code we sent on your phone number ending with ${('' + data.mobileNo).slice(0, -3).replace(/./g, '*') + ('' + data.mobileNo).slice(-3)}`}</Text>
            <InputPin
                onChangeText={(pin) => setOtpPin(pin)}
                errorMessage={error}
            />
            <Text style={{ marginLeft: 15,color:palette.black }}>Didn't receive the code?</Text>
            <Button
                buttonView={{ padding: 10 }}
                ButtonText={"Resend verification code"}
                buttonTextStyle={Style.mailButtonText}
                button={[Style.resendMailButton, { backgroundColor: palette.white }]}
                onPress={() => resendEmail()}
            />
            <BottomButton
                leftButtonText={Constants.profile.back}
                rightButtonText={Constants.Authentication.continue}
                onPressLeft={() => props.navigation.goBack()}
                onPressRight={() => onsubmit()}
                isDisable={otpPin.length === 6 ? false : true}
                rightButtonTextStyke={{ color: otpPin.length !== 6 ? palette.black : palette.white }}
                rightButtonStyle={{ backgroundColor: otpPin.length !== 6 ? palette.smokeWhite : palette.black }}
                rightIndicator={isIndicator}
            />
        </View>
    )
}
export default OtpVerification;

