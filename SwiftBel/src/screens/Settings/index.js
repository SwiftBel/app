import * as React from 'react';
import { View, Image, Text, FlatList, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { banner, char1, char2, char3, Etc, rightBack } from '../../assets';
import { ActionSheetContext, ActionSheetProvider, ActionSheetConsumer } from '../../context/ActionSheetProvider';
import { palette } from '../../theme';
import SignUp from '../signUp/Index';
import { DataList } from './DataList'
import Styles from './Styles';
import { useState } from 'react';
import { useContext } from 'react';
import { getToken } from '../../utils/CommonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../../store/actions/Profile.action';
const Setting = (props) => {
    const dispatch = useDispatch()
    const [ref, setRef] = React.useState()
    const { bottomSheetEditAddress, openEditAddress } = useContext(ActionSheetContext);
    const [selectIndex, setSelectIndex] = React.useState(0)
    const sheetRef = React.useRef();
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const profileData = useSelector(state => state.Profile)
    const [modalHeight, setModalHeight] = React.useState('90%')
    const [index, setIndex] = useState(0)
    React.useEffect(() => {
        init()
        getToken()

    }, [])
    const init = async () => {
        await dispatch(getProfileDetails());
    }
    const getItemLayout = (data, index) => {
        console.log(index, "height")
        return ({
            length: 165,
            offset: 270 * index,
            index
        })
    }

    const onChange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.y / nativeEvent.layoutMeasurement.width);
            console.log(slide)
            setSelectIndex(slide)
        }
    }

    console.log(profileData, "data")
    const onpressLogout = async () => {
        Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
                { text: 'Cancel', onPress: () => { return null } },
                {
                    text: 'Confirm', onPress: async () => {
                        await EncryptedStorage.removeItem("access_token");
                        getToken()
                    }
                },
            ],
            { cancelable: false }
        )
    }


    const getToken = async () => {
        const token = await EncryptedStorage.getItem("access_token");
        const session = await token ? JSON.parse(token) : ''
        console.log("<<<", session)
        setIsAuthenticated(session ? true : false)
    }
    // callbacks

    const handleSnapPress = () => {
        index ? setIndex(false) : setIndex(true)

    }

    const renderItem = ({ item, index }) => {
        return (

            <View style={{ flex: 1, marginBottom: 20, marginLeft: 10, marginTop: 10 }}
            >

                {
                    item.data.map((e, index) =>
                        <View
                            key={index}
                            style={Styles.ButtonContainer}>
                            <TouchableOpacity style={Styles.buttonStyle}
                                onPress={() => props.navigation.navigate(e.screen)}>
                                <View style={{ flexDirection: 'row', }}>
                                    {
                                        e?.icon ?
                                            <Image
                                                source={e.icon}
                                                resizeMode='contain'
                                                style={Styles.iconStyle}
                                            /> : null
                                    }
                                    <Text style={{ fontSize: 16, color: palette.black }}>{e.title}</Text>

                                </View>
                                <Image
                                    source={rightBack}
                                    resizeMode='contain'
                                    style={Styles.iconStyle}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        )
    }
    return (

        <View style={Styles.container}>
            <ActionSheetProvider>
                <Text style={{ fontSize: 28, fontWeight: '500', marginTop: 60, marginLeft: 20 }}>Profile</Text>

                <FlatList
                    data={DataList}
                    contentContainerStyle={{ paddingBottom: 300 }}
                    onScroll={({ nativeEvent }) => onChange(nativeEvent)}
                    getItemLayout={(data, index) => getItemLayout(data, index)}
                    initialScrollIndex={selectIndex}
                    ListHeaderComponent={
                        <View>
                            {isAuthenticated ?
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <TouchableOpacity style={Styles.profileContainer} onPress={() => props.navigation.navigate('ProfileIndex')}>
                                        <Image
                                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2102/2102647.png' }}
                                            resizeMode='cover'
                                            style={Styles.profileImage}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={Styles.businessName}>{`${profileData.profileDetails.firstName} ${profileData.profileDetails.lastName}`}</Text>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('ProfileIndex')}>
                                            <Text style={{ fontSize: 14, textDecorationLine: 'underline', color: palette.grey, marginLeft: 20 }}>Edit profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> :
                                <View>
                                    <Text style={{ fontSize: 18, marginLeft: 20, marginTop: 10, color: palette.grey }}>Log in to start booking service provider</Text>
                                    <View style={{ alignItems: 'center', margin: 20, marginTop: 40 }}>
                                        <TouchableOpacity style={{ height: 60, width: '98%', justifyContent: 'center', alignItems: 'center', backgroundColor: palette.pink, borderRadius: 10, marginRight: 10 }} onPress={() => handleSnapPress()}>
                                            <Text style={{ fontSize: 18, fontWeight: '500', color: palette.white }}>Log In</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                        <Text style={{ fontSize: 16, }}>Don`t have an account?</Text>
                                        <TouchableOpacity onPress={() => handleSnapPress()}>
                                            <Text style={{ fontSize: 16, fontWeight: '500', textDecorationLine: 'underline' }}> Sign Up</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <SignUp
                                        {...props}
                                        modalHeight={modalHeight}
                                        index={index}
                                    />
                                </View>}
                            <View style={Styles.card}>

                                <View style={{ flexDirection: 'row', padding: 20, borderColor: palette.lightGrey, borderBottomWidth: 1 ,flex:1}}>
                                    <View style={Styles.Wrap}>
                                        <Image
                                            source={char3}
                                            resizeMode='cover'
                                            style={{ width: 50, height: 53 }}
                                        />
                                    </View>
                                    <View>
                                        <Text style={Styles.text}>{"Book your service provider"}</Text>
                                        <Text style={Styles.subtext}>with swiftbel gurantee</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    ListFooterComponent={
                        isAuthenticated ? <TouchableOpacity style={Styles.buttonStyle} onPress={() => onpressLogout()} >
                            <Text style={{ fontSize: 16, marginLeft: 20, color: palette.pink }}>LOG OUT</Text>
                        </TouchableOpacity> : null
                    }
                    ref={(ref) => setRef(ref)}
                    renderItem={renderItem}
                />



            </ActionSheetProvider>

        </View>

    )
}
export default Setting;