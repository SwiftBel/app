//import SplashScreen from 'react-native-splash-screen';
import * as React from 'react';
import {
    Caution,
    Cross,
    Right,
    SwiftBel
} from '../../assets/index';
import {
    Button, Input,
} from '../../components/index'
import Constants from '../../utils/Constant';
import { View, Text, Image, StatusBar, TouchableOpacity, Pressable, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native';
import Style from './Style'
import FooterList from './Components/FooterList';
import EncryptedStorage from 'react-native-encrypted-storage';
import { palette } from '../../theme';
import CustomBackdrop from '../../components/CommonCustomBackDrop';
import { useMemo } from 'react';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { EmailValidation } from '../../utils/CommonFunctions';
import { useDispatch } from 'react-redux';
import { verifyEmailUser } from '../../store/actions/Signup.action';
import { useState } from 'react';
import { loginUser } from '../../store/actions/Login.action';
import { ActionSheetContext, ActionSheetProvider } from '../../context/ActionSheetProvider'
import { useContext } from 'react';
import AccountDetails from './MailSignUp/AccountDetails';
const SignUp = (props) => {
    const dispatch = useDispatch()
    const [change, setChange] = React.useState()
    const [validation, setValidation] = React.useState(true)
    const [email, setEmail] = React.useState('')
    const [isIndicator, setIsIndicator] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const sheetRef = React.useRef();
    const [isLogin, setIsLogin] = useState(false)
    const [issetupProfile,setSetupProfile]=useState(false)
    const [modalHeight, setModalHeight] = React.useState('90%')
    const [data, setData] = useState({})
    const { dismissAll } = useBottomSheetModal();
    const { bottomSheetEditAddress,openCompleteProfile, bottomSheetexist, openEditCurrentAddress, openEditAddress,bottomSheetCompleteProfile } = useContext(ActionSheetContext);
    React.useEffect(() => {
        openEditAddress()
    }, [props?.index])


    const handleSnapClose = React.useCallback((index) => {
        bottomSheetEditAddress.current?.close();
    }, []);
    const handleSheetChange = React.useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const snapPoints = useMemo(() => ['1', modalHeight], [modalHeight]);
    const existSnapPoints = useMemo(() => ['1', '60%'], ["60%"]);

    const emailValidation = async (val) => {
        setEmail(val);
        setError('')
        setIsLogin(false)
        const validation = EmailValidation(val);
        if (validation)
            setValidation(true);
        else
            setValidation(false);
    }

    const onpress = async () => {
        var data = {
            "email": email
        }
        if (!validation)
            return
        else {
            setIsIndicator(true)
            const res = await dispatch(verifyEmailUser(data))
            if (res.status == false) {
                if (res?.typeOfAccount === 'Google') {
                    setData(res?.data)
                    openEditCurrentAddress()
                }
                else {
                    
                    setIsLogin(true)
                    setError('')
                }
            }
            else {
                
                setError(res.message)
            }
            setIsIndicator(false);
        }
    }
    const onSubmit = async () => {
        if (validation && password.length > 5) {
            setIsIndicator(true)
            let data = {
                "expression": "Email",
                "email": email,
                "password": password
            }
            const res = await dispatch(loginUser(data))
            if (res.status == true) {
                handleSnapClose()
                //  props.navigation.navigate('DashBoard')
                setIsIndicator(false);
            }
            else {
                setSetupProfile(true)
                setError(res.message);
                setIsIndicator(false);
            }
        }

    }
    const AlreadyExistAccount = () => {
        return (
            <BottomSheetModal
                ref={bottomSheetexist}
                enablePanDownToClose
                backdropComponent={CustomBackdrop}
                index={1}
                snapPoints={existSnapPoints}
                enableOverDrag={true}
                handleIndicatorStyle={{ backgroundColor: "transparent" }}
                style={{ borderRadius: 10, }}
            >
                <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                        <View >
                            <View style={{ height: 60, marginTop: -20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderColor: palette.lightGrey, marginBottom: 30 }}>
                                <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', left: 20, top: 20 }}>
                                    <Image
                                        source={Cross}
                                        resizeMode='contain'
                                        style={{ height: 25, width: 25 }}
                                    />
                                </TouchableOpacity>
                                <Text style={Style.modatHeaderText}>{"Account exists"}</Text>

                            </View>
                            <Text style={Style.text}>Looks like you already have an account.</Text>
                            <Text style={Style.text}>Please log in instead.</Text>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <View style={Style.profileContainer} onPress={() => props.navigation.navigate('ProfileIndex')}>
                                    <Image
                                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2102/2102647.png" }}
                                        resizeMode='cover'
                                        style={Style.profileImage}
                                    />
                                </View>
                                <Text style={Style.nametext}>{data?.name}</Text>
                                <Text style={Style.nametext}>{data?.email}</Text>
                                <FooterList navigation={props.navigation} type={"google"} />
                            </View>
                            <TouchableOpacity onPress={() => openEditAddress()}>
                                <Text style={{ marginTop: 20, marginLeft: 20, fontSize: 18, fontWeight: '500', textDecorationLine: 'underline', letterSpacing: 0.1 }}>Log in with diffrent account</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </Pressable>

            </BottomSheetModal>
        )
    }
    return (
        <ActionSheetProvider>
            <BottomSheetModal
                ref={bottomSheetEditAddress}
                enablePanDownToClose
                onChange={handleSheetChange}
                backdropComponent={CustomBackdrop}
                index={1}
                snapPoints={snapPoints}
                enableOverDrag={true}
                handleIndicatorStyle={{ backgroundColor: "transparent" }}
                style={{ borderRadius: 10, }}
            >
                <Pressable style={{ height: '100%', flex: 1 }} onPress={() => Keyboard.dismiss()}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                        <SafeAreaView >
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

                            <View style={Style.container}>

                                <Input
                                    placeholder={'Email'}
                                    onChangeText={(text) => emailValidation(text)}
                                    leftIcon={email.length ? validation ? Right : Caution : ''}
                                    inputStyle={{ borderRadius: 10, }}
                                    borderColor={email.length ? validation ? palette.black : palette.pink : palette.lightGrey}
                                    value={email}
                                    secureTextEntry={false}
                                    errorMessage={email.length ? !validation ? 'Enter a valid Email' : '' : ''}
                                />
                                {isLogin ? <Input
                                    placeholder={Constants.Authentication.password}
                                    onChangeText={(text) => setPassword(text)}
                                    inputStyle={{ borderRadius: 10, marginTop: 20 }}
                                    showHide={true}
                                    value={password}
                                    errorMessage={error}
                                /> : null}
                                <Button
                                    buttonView={{ alignItems: 'center' }}
                                    ButtonText={Constants.Authentication.continue}
                                    buttonTextStyle={Style.buttonText}
                                    button={Style.button}
                                    onPress={() => isLogin ? onSubmit() : onpress()}
                                />
                                <View style={{ margin: 30, alignItems: 'center', marginTop: 40, borderTopWidth: 1, borderColor: palette.grey }}>
                                    <View style={Style.orText}>
                                        <Text style={Style.bottomText}>{"or"}</Text>
                                    </View>
                                    <FooterList navigation={props.navigation} />
                                    {AlreadyExistAccount()}


                                </View>
                            </View>
                        </SafeAreaView>
                    </KeyboardAvoidingView>
                </Pressable>
            </BottomSheetModal>
          {issetupProfile?  <AccountDetails
                {...props}
                modalHeight={modalHeight}
                index={0}
            />:null}
        </ActionSheetProvider>
    );
}
export default SignUp;