import * as React from 'react';
import {
    SwiftBel,
    Caution,
    Right,
    Logo,
    Cross
} from '../../../assets/index';
import {
    Input,
    RippleButton,
    Header
} from '../../../components/index'
import Constants from '../../../utils/Constant';
import { View, Text, Image, ScrollView,TouchableOpacity } from 'react-native';
import Style from '../Style'
import { palette } from '../../../theme';
import KeyBoardAvoidingWrapper from '../../../components/KeyBoardAvoidingWrapper';
import { EmailValidation } from '../../../utils/CommonFunctions';
import { registerMail, onSubmitMail, newCreateProfile } from '../../../store/actions/Signup.action'
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import MainHeader from '../../../components/Header/MainHeader/MainHeader';
import PhoneInpuField from '../../../components/PhoneInput/PhoneInput';
import MapSearchInput from '../../../components/MapSearchInput';
import { BottomSheetModal,useBottomSheetModal } from '@gorhom/bottom-sheet';
import {ActionSheetContext} from '../../../context/ActionSheetProvider'
import { useContext } from 'react';
import { useMemo } from 'react';
import CustomBackdrop from '../../../components/CommonCustomBackDrop';

const AccountDetail = (props) => {
    const [validation, setValidation] = React.useState(true)
    const [email, setEmail] = React.useState('')
    const [isIndicator, setIsIndicator] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [values, setValues] = React.useState({})
    const [modalHeight, setModalHeight] = React.useState('90%')
 
    const { dismissAll } = useBottomSheetModal();
    const { openCompleteProfile,bottomSheetCompleteProfile, openEditAddress } = useContext(ActionSheetContext);
    React.useEffect(() => {
        openCompleteProfile()
    }, [props?.index])


    const handleSnapClose = React.useCallback((index) => {
        bottomSheetEditAddress.current?.close();
    }, []);
    const handleSheetChange = React.useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const snapPoints = useMemo(() => ['1', modalHeight], [modalHeight]);
    const existSnapPoints = useMemo(() => ['1', '90%'], ["90%"]);
    const dispatch = useDispatch()
    const handlechange = (name, value) => {
        setValues({ ...values, [name]: value })
        console.log(values, "value")
    }
    const onpress = async () => {
        const data = { ...values, "email": email }
        if (!validation)
            return
        else {
            setIsIndicator(true)
            const res = await props.newCreateProfile(data);
            if (res.status == true) {
                props.navigation.navigate('SetServices', {
                    email: email
                })
            }
            else {
                setError(res.message)
            }
            setIsIndicator(false);
        }

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
        <BottomSheetModal
        ref={bottomSheetCompleteProfile}
        enablePanDownToClose
        backdropComponent={CustomBackdrop}
        index={1}
        snapPoints={existSnapPoints}
        enableOverDrag={true}
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
        style={{ borderRadius: 10, }}
    >
        <View style={Style.container} >
                           
            <KeyBoardAvoidingWrapper behavior={"height"} style={Style.keyBoardWrapper} >
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <View style={{ zIndex: 1, }}>
                    <View style={{ height: 60, marginTop: -20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderColor: palette.lightGrey, marginBottom: 30 }}>
                                <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', left: 20, top: 20 }}>
                                    <Image
                                        source={Cross}
                                        resizeMode='contain'
                                        style={{ height: 25, width: 25 }}
                                    />
                                </TouchableOpacity>
                                <Text style={Style.modatHeaderText}>{"Log in or sign up"}</Text>

                            </View>
                        <Input
                            placeholder={Constants.profile.firstName}
                            onChangeText={(text) => handlechange('businessName', text)}
                            inputStyle={{ borderRadius: 10, }}
                            secureTextEntry={false}
                            value={values.BusinessName}
                        />
                             <Input
                            placeholder={"Last name"}
                           
                            onChangeText={(text) => handlechange('ownerName', text)}
                            inputStyle={{ borderRadius: 10, }}
                            secureTextEntry={false}
                            value={values.ownerName}
                        />
                        <View style={Style.dragView}>
                           
                            <MapSearchInput
                                disableScroll={true}
                                listView={{ height: 135, zIndex: 1000, width: '97%', borderWidth: 1, marginLeft: 5, marginBottom: 10, borderRadius: 15, borderColor: palette.lightGrey, marginTop: 5 }}
                                onPress={(data) => handlechange('address', data.description)}
                                onLocation={(location) => console.log(location)}
                                placeholder={'Address'}
                                textInputStyle={{ borderRadius: 10, alignSelf: 'center', backgroundColor: '#F3F3F3', height: 50 }}
                            />
                        </View>
                        <PhoneInpuField
                           
                            PhoneInputContainer={{ marginLeft: 30, marginRight: 10, marginBottom: 10, marginTop: 10 }}
                            phoneInputStyle={{ borderRadius: 10, backgroundColor: '#F3F3F3' }}
                            flagButtonStyle={{ borderRadius: 10, backgroundColor: '#F3F3F3' }}
                            onChangeFormattedText={(text) => {
                                var cleaned = ("" + text).replace(/\D/g, "");
                                handlechange('phone', cleaned)
                            }}
                            onChangeText={(text) => {
                                console.log(text)
                            }}
                        //  value={values.phone}
                        />

                 
                        <Input
                            header={true}
                            headerName={"Email *"}
                            placeholder={'Email'}
                            onChangeText={(text) => emailValidation(text)}
                            leftIcon={email.length ? validation ? Right : Caution : ''}
                            inputStyle={{ borderRadius: 10, }}
                            borderColor={email.length ? validation ? palette.black : palette.pink : palette.lightGrey}
                            value={email}
                            secureTextEntry={false}
                            errorMessage={email.length ? !validation ? 'Enter a valid Email' : error : ''}
                        />
                    </View>
                    <RippleButton
                        buttonView={{ alignItems: 'center', marginTop: 20 }}
                        ButtonText={Constants.Authentication.Next}
                        buttonTextStyle={[Style.mailButtonText,
                        {
                            color: email.length ?
                                validation ? palette.white : palette.grey : palette.grey
                        }]}
                        button={[Style.mailButton,
                        {
                            backgroundColor: email.length ?
                                validation ? palette.black : palette.smokeWhite : palette.smokeWhite
                        }]}
                        onPress={() => onpress()}
                        indicator={isIndicator}
                    />
                </ScrollView>
            </KeyBoardAvoidingWrapper>


        </View>

</BottomSheetModal>
    );
}
const mapStateToProps = (state) => ({ SignUp: state.SignUp });

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            registerMail,
            onSubmitMail,
            AccountDetail,
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountDetail);