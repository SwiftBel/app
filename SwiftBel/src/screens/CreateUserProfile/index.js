import * as React from 'react';
import {
 Input, RippleButton,ProfileHeader
} from '../../components/index'
import { StatusBar, View } from 'react-native';
import Style from './Style'
import Constants from '../../utils/Constant';
import { palette } from '../../theme';
import {useDispatch} from 'react-redux'
import {addBussinessName} from '../../store/actions/Profile.action'
import KeyBoardAvoidingWrapper from '../../components/KeyBoardAvoidingWrapper';
const Profile = (props) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const onSubmit=()=>{
        const data={
            firstName:firstName,
            lastName:lastName
        }
        dispatch(addBussinessName(data));
        props.navigation.navigate('MobileNumber')
    }
    return (
        <View style={Style.container}>
             <StatusBar barStyle='dark-content' />
        <KeyBoardAvoidingWrapper style={Style.container}>
        <View style={Style.container}>
            <ProfileHeader rightText={Constants.profile.TellUsaname} />
            <Input
                placeholder={Constants.profile.firstName}
                header={true}
                headerName={Constants.profile.firstName}
                onChangeText={(text) => setFirstName(text)}
                inputStyle={{ borderRadius: 40, alignSelf: 'center' }}
                secureTextEntry={false}
                value={firstName}
            />
            <Input
                placeholder={Constants.profile.lastName}
                header={true}
                headerName={Constants.profile.lastName}
                onChangeText={(text) => setLastName(text)}
                inputStyle={{ borderRadius: 40, alignSelf: 'center' }}
                secureTextEntry={false}
                value={lastName}
            />
        </View>
        </KeyBoardAvoidingWrapper>
            <View style={Style.bottomContainer}>
                <RippleButton
                    buttonView={{ alignItems: 'center' }}
                    ButtonText={Constants.Authentication.continue}
                    buttonTextStyle={[Style.buttonText,
                    { color: firstName &&lastName ? palette.white : palette.black }]}
                    button={[Style.button,
                    { backgroundColor: firstName &&lastName ? palette.black : palette.smokeWhite }]}
                    onPress={() =>onSubmit() }
                    isDisable={firstName &&lastName ? false : true}
                />

            </View>
        </View>
    );
}
export default Profile;