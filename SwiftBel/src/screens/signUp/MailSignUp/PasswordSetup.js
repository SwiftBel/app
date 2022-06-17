import React, { useState } from "react";
import { Text } from "react-native";
import {
    heightPercentageToDP as hp
} from '../../../utils/Responsive/index'
import {
    RippleButton,
} from '../../../components/index'
import CommonLayout from "../../../components/CommonLayout";
import Constants from "../../../utils/Constant";
import Style from '../Style'
import InputList from "./components/InputList";
import { palette } from "../../../theme";
import { setPassword } from '../../../store/actions/Signup.action'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const PasswordSetup = (props) => {

    const { Authentication } = Constants
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validation, setValidation] = useState(false)
    const [isIndicator, setIsIndicator] = React.useState(false)
    const [isValidate, setisValidate] = useState(false)

    const validate = (text) => {
        setPassword(text);

        if (password == confirmPassword)
            setValidation(true);
        else
            setValidation(false);

    }
    const confirmValidate = (text) => {

        setConfirmPassword(text)
        if (password == text)
            setValidation(true);
        else
            setValidation(false);

    }
    const onpress = async () => {
        if (!validation)
            return
        else {
            const data = {
                "email": props.SignUp.emailId,
                "password": password
            };
            setIsIndicator(true)
            const res = await props.setPassword(data);
            if (res.status == true) {
                props.navigation.navigate('Home')
                setIsIndicator(false);
            }
        }
    }
    return (
        <CommonLayout navigation={props.navigation}>
            <Text style={Style.bottomText}>{Authentication.SetUpPassword}</Text>
            <InputList
                onChangePassword={(text) => validate(text)}
                onChangeConfirmPassword={(text) => confirmValidate(text)}
                email={props.SignUp.emailId}
                isValidate={(error) => setisValidate(error)}
            />
            <RippleButton
                buttonView={{ alignItems: 'center', paddingTop: hp('4=5%') }}
                ButtonText={Constants.Authentication.continue}
                buttonTextStyle={[Style.mailButtonText, { color: (validation && isValidate) ? palette.white : palette.grey }]}
                button={[Style.mailButton, { backgroundColor: (validation && isValidate) ? palette.black : palette.smokeWhite }]}
                onPress={() => onpress()}
                isDisable={(validation && isValidate) ? false : true}
                indicator={isIndicator}
            />
        </CommonLayout>
    )
}
const mapStateToProps = (state) => ({ SignUp: state.SignUp });

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setPassword
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PasswordSetup);