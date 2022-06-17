import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import {
    heightPercentageToDP as hp
} from '../../../utils/Responsive/index'
import CommonLayout from "../../../components/CommonLayout";
import Constants from "../../../utils/Constant";
import Style from '../Style'
import { Button, RippleButton } from "../../../components/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { rensendVerification,verifyId } from '../../../store/actions/Signup.action'
import { palette } from "../../../theme";
const VerifyMail = (props) => {
    const [counter, setCounter] = useState(30)
    const [isIndicator, setIsIndicator] = React.useState(false)
    const [error, setError] = React.useState(false)
    const { Authentication } = Constants

    useEffect(() => async () => {
        await props.rensendVerification(props.SignUp.emailId);
    }, []);
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => { clearInterval(timer) };
    }, [counter]);

    const resendEmail = async () => {
        await props.rensendVerification(props.SignUp.emailId);
        setCounter(30)
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            if (counter == 0)
                clearTimeout(timer)
        };
    }
    const onsubmit=async()=>{
        setIsIndicator(true)
        const res=await props.verifyId();
        setIsIndicator(false)
        if(res.data.isVerified==true)
        {
        setError(false)
        props.navigation.navigate('PasswordSetup')
        }
        else
        {
        setError(true)
        }
    }
    return (
        <CommonLayout navigation={props.navigation}>
            <Text style={Style.bottomText}>{Authentication.Verifyyouremail}</Text>
            <Text style={[Style.bottomText, { textAlign: 'center' }]}>{Authentication.EmailSent}
                <Text style={{ fontWeight: 'bold' }}>
                    {props.SignUp.emailId}
                </Text>
            </Text>
            <Text style={[Style.bottomText, { textAlign: 'center' }]}>{Authentication.EmailtoComplete}
                <Text style={{ fontWeight: 'bold' }}>
                    {Authentication.SpamFolder}
                </Text>
            </Text>
            <Text style={[Style.bottomText, { paddingTop: hp('5%') }]}>{Constants.Authentication.cantfindtheemail}</Text>
            {counter != 0 ? <Text style={[Style.bottomText]}>{"resend Email in "}
                <Text style={{ fontWeight: 'bold' }}>{`${counter} sec`}</Text>
            </Text> : null}
            <Button
                buttonView={{ alignItems: 'center' }}
                ButtonText={Constants.Authentication.ResendEmail}
                buttonTextStyle={Style.mailButtonText}
                button={[Style.resendMailButton, { backgroundColor: counter > 0 ? '#ebecf0' : palette.white, }]}
                onPress={() => resendEmail()}
                isDisable={counter > 0 ? true : false}
            />
            <Text style={[Style.bottomText, { textAlign: 'center' }]}>{Authentication.needHelp}
                <Text style={{ fontWeight: 'bold' }}>
                    {Authentication.ContactUs}
                </Text>
            </Text>
            {error?
             <Text style={[Style.bottomText,{ color:palette.pink}]}> {"Please Verifed your Email"}</Text>:null}
            <RippleButton
                buttonView={{ alignItems: 'center', paddingTop: hp('5%') }}
                ButtonText={Constants.Authentication.Next}
                buttonTextStyle={Style.buttonText}
                button={Style.button}
                onPress={() => onsubmit()}
                indicator={isIndicator}
            />
        </CommonLayout>
    )
}
const mapStateToProps = (state) => ({ SignUp: state.SignUp });

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            rensendVerification,
            verifyId
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyMail);