import React, { useState } from "react";
import { Text, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from '../../../../utils/Responsive/index'
import Constants from "../../../../utils/Constant";
import Style from '../../Style'
import Input from "../../../../components/TextField/Input";
import { palette } from "../../../../theme/index";
import { Caution } from "../../../../assets";
import { containEmailValidation, numberSymbolValidation } from "../../../../utils/CommonFunctions";

const InputList = (props) => {

    const { Authentication } = Constants
    const [secure, setSecure] = useState('')
    const [islength, setIsLength] = useState(false)
    const [isContainName, setIsContainName] = useState(false)
    const [isSymbol, setIsSymbol] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showIcon, setShowIcon] = useState(true)

    const validate = (text) => {
        props.onChangePassword(text);
        setPassword(text)
        setSecure(true);

        containEmailValidation(props.email, text) ?
            setIsContainName(false) :
            setIsContainName(true)

        numberSymbolValidation(text) ?
            setIsSymbol(true) :
            setIsSymbol(false);

            const reg=/^(?=.*[A-Z]).{8,}/;
             (reg.test(text) === true)?
             setIsLength(true) :
             setIsLength(false);
            
        // (text.length >= 8) ?
        //     setIsLength(true) :
        //     setIsLength(false);


    }
    const confirmValidate = (text) => {
        props.onChangeConfirmPassword(text);
        setConfirmPassword(text)
        if (text.length >= password.length) {
            props.isValidate((isSymbol && islength && isContainName));
            if (password === text)
                setShowIcon(true);
            else
                setShowIcon(false);
        }
        else {
            setShowIcon(true);
        }
    }

    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Input
                placeholder={Authentication.TypePassword}
                onChangeText={(text) => validate(text)}
                inputContainer={{marginBottom:10}}
                inputStyle={{ borderRadius: 40, borderColor: palette.smokeWhite }}
                showHide={password.length ? true : false}
                value={password}
            />
            {
                secure ?
                    <View style={{ paddingBottom: hp('2%'), alignSelf: 'flex-start' }}>
                        {
                            (isSymbol && islength && isContainName) ? <Text style={[Style.PasswordValidation, { color: palette.orange }]}>{Authentication.Passwordgood}</Text> :
                                <View>
                                    <Text style={[Style.PasswordValidation, { color: palette.pink }]}>{Authentication.Passwordweak}</Text>
                                    <Text style={[Style.PasswordValidation, { color: isContainName ? palette.grey : palette.pink }]}>{Authentication.Cantcontainemailaddress}</Text>
                                    <Text style={[Style.PasswordValidation, { color: islength ? palette.grey : palette.pink }]}>{Authentication.Atleastcharacters}</Text>
                                    <Text style={[Style.PasswordValidation, { color: isSymbol ? palette.grey : palette.pink }]}>{Authentication.Containssymbol}</Text>
                                </View>
                        }
                    </View> : null
            }
            <Input
                placeholder={Authentication.passwordConfirmation}
                onChangeText={(text) => confirmValidate(text)}
                inputStyle={{ borderRadius: 40, }}
                
                showHide={showIcon ?
                    confirmPassword.length ?
                        true : false : false}
                leftIcon={!showIcon ? Caution : false}
                errorMessage={showIcon ? '' : Authentication.Passwordnotmatching}
                borderColor={!showIcon ? palette.pink : palette.lightGrey}
                secureText={true}
                value={confirmPassword}
            />
        </View>

    )
}
export default InputList