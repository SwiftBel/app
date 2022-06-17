import React from 'react'
import { Text } from "react-native"
import CommonLayout from '../../../components/CommonLayout';
import {
    Caution,
    Right
} from '../../../assets/index';
import {
    Input,
    RippleButton
} from '../../../components/index'
import Constants from '../../../utils/Constant';
import Style from '../Style'
import { palette } from '../../../theme';
import { EmailValidation } from '../../../utils/CommonFunctions';
import {loginUser} from '../../../store/actions/Login.action'
import {useDispatch} from 'react-redux'
const LoginMail = (props) => {
    const dispatch=useDispatch()
    const [validation, setValidation] = React.useState(true)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isIndicator, setIsIndicator] = React.useState(false)
    const [error, setError] = React.useState('')
    const onpress = async () => {
        if (validation && password.length > 5) {
            setIsIndicator(true)
            let data = {
                "expression": "Email",
                "email": email,
                "password": password
            }
            const res = await dispatch(loginUser(data))
            if (res.status == true) {
           
                props.navigation.navigate('DashBoard')
                setIsIndicator(false);
            }
            else {
                setError(res.message);
                setIsIndicator(false);
            }
        }

    }
    const onchangeEmail = async (val) => {
        setEmail(val);
        const validation = EmailValidation(val);
        if (validation)
            setValidation(true);
        else
            setValidation(false);
    }
    const onchangePassword = (text) => {
        setPassword(text)
    }
    return (
        <CommonLayout navigation={props.navigation}>
            <Text style={Style.bottomText}>{Constants.Authentication.LoginwithMail}</Text>
            <Input
                placeholder={'Email'}
                onChangeText={(text) => onchangeEmail(text)}
                leftIcon={email.length ? validation ? Right : Caution : ''}
                inputStyle={{ borderRadius: 40, }}
                borderColor={email.length ? validation ? palette.lightGrey : palette.pink : palette.lightGrey}
                value={email}
                secureTextEntry={false}
                errorMessage={email.length ? !validation ? 'Enter a valid Email' : '' : ''}
            />
            <Input
                placeholder={Constants.Authentication.password}
                onChangeText={(text) => onchangePassword(text)}
                inputStyle={{ borderRadius: 40, marginTop: 20 }}
                showHide={true}
                value={password}
                errorMessage={error}
            />
            <RippleButton
                buttonView={{ alignItems: 'center', marginTop: 20 }}
                ButtonText={Constants.Authentication.Next}
                buttonTextStyle={[Style.mailButtonText,
                {
                    color: email.length && password.length > 5 ?
                        validation ? palette.white : palette.grey : palette.grey
                }]}
                button={[Style.mailButton,
                {
                    backgroundColor: email.length && password.length > 5 ?
                        validation ? palette.black : palette.smokeWhite : palette.smokeWhite
                }]}
                onPress={() => onpress()}
                isDisable={email.length && password.length > 5 ? validation ? false : true : true}
                indicator={isIndicator}
            />

        </CommonLayout>
    )
}
export default LoginMail