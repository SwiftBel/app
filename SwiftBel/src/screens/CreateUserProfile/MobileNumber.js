import * as React from 'react';
import {
    Button, Input, RippleButton,
} from '../../components/index'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';
import Style from './Style'
import ProfileHeader from '../../components/Header/ProfileHeader';
import Constants from '../../utils/Constant';
import ComponentPhoneInpuField from '../../components/PhoneInput/PhoneInput';
import BottomButton from './components/BottomButton';
import { mobileNo } from '../../store/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux';
import { palette } from '../../theme';
const MobileNumber = (props) => {
    const [mobiileno, setMobileNo] = React.useState('')
    const [withoutCodeMobiileno, setWithoutCodeMobileNo] = React.useState('')
    const [isIndicator, setIsIndicator] = React.useState(false)
    const [error,setError]=React.useState('')
    const dispatch = useDispatch();

    const onchangeText = React.useCallback((text) => {
        setError('')
        var cleaned = ("" + text).replace(/\D/g, "");
        setMobileNo(cleaned);
    })
    const onChangeWithoutCode = (text) => {
        var cleaned = ("" + text).replace(/\D/g, "");
        setWithoutCodeMobileNo(cleaned)
    }
    const onsubmit = async () => {
        setIsIndicator(true)
        const res = await mobileNo(dispatch)(mobiileno, () => {
        });
        if (res.status == true) {
            props.navigation.navigate('Otpverification')
            setIsIndicator(false);
        }
        else{
            setIsIndicator(false);
            setError(res.message)}
    }
    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Style.container}>
            <ProfileHeader rightText={"Enter your mobile number"} />
            
            <ComponentPhoneInpuField
                onChangeFormattedText={(text) => onchangeText(text)}
                onChangeText={(text) => onChangeWithoutCode(text)}
                errorMessage={error}
            />

            <BottomButton
                leftButtonText={Constants.profile.back}
                rightButtonText={Constants.Authentication.continue}
                onPressLeft={() => props.navigation.goBack()}
                onPressRight={() => onsubmit()}
                isDisable={withoutCodeMobiileno.length === 10 ? false : true}
                rightButtonTextStyke={{ color: withoutCodeMobiileno.length !== 10 ? palette.black : palette.white }}
                rightButtonStyle={{ backgroundColor: withoutCodeMobiileno.length !== 10 ? palette.smokeWhite : palette.black }}
                rightIndicator={isIndicator}
            />
            
        </View>
        </TouchableWithoutFeedback>
      
    );
}
export default MobileNumber;