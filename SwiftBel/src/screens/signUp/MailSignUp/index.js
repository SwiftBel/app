import * as React from 'react';
import {
    SwiftBel,
    Caution,
    Right
} from '../../../assets/index';
import {
    Input,
    RippleButton,
    Header
} from '../../../components/index'
import Constants from '../../../utils/Constant';
import { View, Text, Image, } from 'react-native';
import Style from '../Style'
import { palette } from '../../../theme';
import KeyBoardAvoidingWrapper from '../../../components/KeyBoardAvoidingWrapper';
import { EmailValidation } from '../../../utils/CommonFunctions';
import { registerMail, onSubmitMail } from '../../../store/actions/Signup.action'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const MailSignUp = (props) => {
    const [validation, setValidation] = React.useState(true)
    const [email, setEmail] = React.useState('')
    const [isIndicator, setIsIndicator] = React.useState(false)
    const [error, setError] = React.useState(false)
    const onpress = async () => {
        if (!validation)
            return
        else {
            setIsIndicator(true)
            const res = await props.onSubmitMail(email);
            if (res.status == true) {
                props.navigation.navigate('VerifyMail')
            }
            else {
                setError(res.message)
            }
            setIsIndicator(false);
        }
        console.log(props.SignUp.emailId)
    }
    const emailValidation = async (val) => {
        setEmail(val);
        setError('')
        const validation = EmailValidation(val);
        if (validation)
            setValidation(true);
        else
            setValidation(false);
    }
    return (
        <KeyBoardAvoidingWrapper behavior={"height"} style={Style.container} >
            <View>
                <Header goBack={() => props.navigation.goBack()}
                centerText={'hello'}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={SwiftBel}
                        style={Style.LogoName_Style}
                        resizeMode='contain'
                    />
                </View>
                <View style={Style.bottomContainer}>
                    <View style={{ margin: 30, alignItems: 'center', marginTop: 40 }}>
                        <Text style={Style.bottomText}>{Constants.Authentication.emailforregistration}</Text>
                        <Input
                            placeholder={'Email'}
                            onChangeText={(text) => emailValidation(text)}
                            leftIcon={email.length ? validation ? Right : Caution : ''}
                            inputStyle={{ borderRadius: 10, }}
                            borderColor={email.length ? validation ? palette.black : palette.pink : palette.black}
                            value={email}
                            secureTextEntry={false}
                            errorMessage={email.length ? !validation ? 'Enter a valid Email' : error : ''}
                        />
                        <RippleButton
                            buttonView={{ alignItems: 'center', marginTop: 20 }}
                            ButtonText={Constants.Authentication.Next}
                            buttonTextStyle={[Style.mailButtonText,
                            {   color: email.length ?
                                validation ? palette.white : palette.grey : palette.grey
                            }]}
                            button={[Style.mailButton,
                            {   backgroundColor: email.length ?
                                validation ? palette.black : palette.smokeWhite : palette.smokeWhite
                            }]}
                            onPress={() => onpress()}
                            indicator={isIndicator}
                        />
                    </View>
                </View>
            </View>
        </KeyBoardAvoidingWrapper>
    );
}
const mapStateToProps = (state) => ({ SignUp: state.SignUp });

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            registerMail,
            onSubmitMail
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MailSignUp);