import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, Image, ScrollView, TouchableOpacity, Switch } from 'react-native'
import { chevrondown, Cross, Delete, info } from '../../assets'
import { palette } from '../../theme'
import InputPicker from '../../components/InputPicker/InputPicker'
import styles from './Style'
import { Input, RippleButton } from '../../components'
import { useDispatch } from 'react-redux'
import { getPlumberInputDetails } from '../../store/actions/UserInput'
import MapSearchInput from '../../components/MapSearchInput'
const WindowWashingInput = props => {
    const dispatch = useDispatch()
    const [animationType, setAnimationType] = useState('slide')
    const [indicator, setIndicator] = useState(false)
    const [Estimatedhour, setEstimatedHour] = useState('Select')
    const [startingAddress, setStartingAddress] = useState("")
    const [ApproxSize, setApproxSize] = useState('Select')
    const [isWindowCleaning, setIsWindowCleaning] = useState(false)
    const [haveScreen, setHaveScreen] = useState(false)
    const [isStromWindow, setIsStromWindow] = useState(false)
    const [stromWindows,setStromWindows]=useState('Medium')
    const [screens,setScreens]=useState('2')
    const [windowCleaningValue, setWindowCleaningValue] = useState({
        "address": '',
        "smallRegularWindows": '',
        "mediumRegularWindows": '',
        "largeRegularWindows": '',

    })
    const [windowCleaningInside, setWindowCleaningInside] = useState({
        "windows": '',
        "smallRegularWindows": '',
        "mediumRegularWindows": '',
        "largeRegularWindows": '',

    })
    const modal = useRef(null)
    const close = () => {
        // setModalVisible(false)

    }
    const handlechange = (name, value) => {
        setWindowCleaningValue({ ...windowCleaningValue, [name]: value })
    }
    const handlechangeWcInside = (name, value) => {
        setWindowCleaningInside({ ...windowCleaningInside, [name]: value })
    }
    const onselect = async () => {
        setIndicator(true)
        const data = {
            "fromAddress": startingAddress,
            "estimatedHourOfWork": Estimatedhour

        }
        const res = await dispatch(getPlumberInputDetails(data))
        props.onCancel();
        setIndicator(false)
    }


    const renderOptionList = () => {

        return (
            <View
                style={[styles.overlayStyle, props.overlayStyle]}
            >
                <View style={[styles.optionContainer, props.optionContainer]}>
                    <View style={{ height: 40, justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: 10, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => props.onCancel()} style={{ alignSelf: 'center' }}>
                            <Image
                                source={Cross}
                                resizeMode='contain'
                                style={{ height: 30, width: 30 }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.modatHeaderText}>{props.headerName}</Text>
                        <View></View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16} keyboardShouldPersistTaps="always" style={{ marginBottom: 30 }}>
                        <View style={{ paddingHorizontal: 10, flex: 1 }}>

                            <View style={styles.dragView}>
                                <Text style={{ margin: 5 }}>Starting Address</Text>
                                <MapSearchInput
                                    disableScroll={true}
                                    listView={{ height: 130, width: '97%', borderWidth: 1, marginLeft: 5, marginBottom: 10, borderRadius: 15, borderColor: palette.lightGrey, }}
                                    onPress={(data) => handlechange("address", data.description)}
                                    onLocation={(location) => console.log(location)}
                                    placeholder={'Starting Address'}
                                    textInputStyle={{ borderWidth: 1, borderColor: palette.lightGrey, height: 50 }}
                                />
                            </View>
                            <InputPicker
                                buttonStyle={{ width: "95%" }}
                                headerName={'Number of regular windows'}
                                modalHeader={'Number of small windows'}
                                PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                data={[
                                    { label: '1', value: '1', key: 1 },
                                    { label: '2', value: '2', key: 2 },
                                    { label: '3', value: '3', key: 3 },
                                    { label: '4', value: '4', key: 4 },
                                    { label: '5', value: '5', key: 5 },
                                    { label: '6', value: '6', key: 6 },
                                    { label: '7', value: '7', key: 7 },
                                ]}
                                placeholder={`Small Windows(${windowCleaningValue.smallRegularWindows})`}
                                value={windowCleaningValue.smallRegularWindows}
                                onChange={(value) => {
                                    handlechange("smallRegularWindows", value)
                                }}
                            />
                            <InputPicker
                                buttonStyle={{ width: "95%" }}
                                // headerName={'Number of regular windows'}
                                modalHeader={'Number of medium windows'}
                                PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                data={[
                                    { label: '1', value: '1', key: 1 },
                                    { label: '2', value: '2', key: 2 },
                                    { label: '3', value: '3', key: 3 },
                                    { label: '4', value: '4', key: 4 },
                                    { label: '5', value: '5', key: 5 },
                                    { label: '6', value: '6', key: 6 },
                                    { label: '7', value: '7', key: 7 },
                                ]}
                                placeholder={`Medium Windows(${windowCleaningValue.mediumRegularWindows})`}
                                value={windowCleaningValue.mediumRegularWindows}
                                onChange={(value) => {
                                    handlechange("mediumRegularWindows", value)
                                }}
                            />
                            <InputPicker
                                buttonStyle={{ width: "95%" }}
                                //headerName={'Number of regular windows'}
                                modalHeader={'Number of large windows'}
                                PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                data={[
                                    { label: '1', value: '1', key: 1 },
                                    { label: '2', value: '2', key: 2 },
                                    { label: '3', value: '3', key: 3 },
                                    { label: '4', value: '4', key: 4 },
                                    { label: '5', value: '5', key: 5 },
                                    { label: '6', value: '6', key: 6 },
                                    { label: '7', value: '7', key: 7 },
                                ]}
                                placeholder={`Large Windows(${windowCleaningValue.largeRegularWindows})`}
                                value={windowCleaningValue.largeRegularWindows}
                                onChange={(value) => {
                                    handlechange("largeRegularWindows", value)
                                }}
                            />

                            <View style={styles.switchToggle}>
                                <Text style={{ marginRight: 30, width: '80%' }}>Would you like your windows cleaned from the inside?</Text>
                                <Switch
                                    value={isWindowCleaning}
                                    onValueChange={(val) => setIsWindowCleaning(val)}
                                />
                            </View>
                            {
                                isWindowCleaning ? <View>
                                    <InputPicker
                                        buttonStyle={{ width: "95%" }}
                                        modalHeader={'Number of small windows'}
                                        PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                        data={[
                                            { label: '1', value: '1', key: 1 },
                                            { label: '2', value: '2', key: 2 },
                                            { label: '3', value: '3', key: 3 },
                                            { label: '4', value: '4', key: 4 },
                                            { label: '5', value: '5', key: 5 },
                                            { label: '6', value: '6', key: 6 },
                                            { label: '7', value: '7', key: 7 },
                                        ]}

                                        placeholder={`Medium Windows(${windowCleaningInside.windows})`}
                                        value={windowCleaningInside.windows}
                                        onChange={(value) => {
                                            handlechangeWcInside("windows", value)
                                        }}
                                    />
                                    <InputPicker
                                        buttonStyle={{ width: "95%" }}
                                        headerName={'Number of windows'}
                                        modalHeader={'Number of small windows'}
                                        PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                        data={[
                                            { label: '1', value: '1', key: 1 },
                                            { label: '2', value: '2', key: 2 },
                                            { label: '3', value: '3', key: 3 },
                                            { label: '4', value: '4', key: 4 },
                                            { label: '5', value: '5', key: 5 },
                                            { label: '6', value: '6', key: 6 },
                                            { label: '7', value: '7', key: 7 },
                                        ]}
                                        placeholder={`Small Windows(${windowCleaningInside.smallRegularWindows})`}
                                        value={windowCleaningInside.smallRegularWindows}
                                        onChange={(value) => {
                                            handlechangeWcInside("smallRegularWindows", value)
                                        }}
                                    />
                                    <InputPicker
                                        buttonStyle={{ width: "95%" }}
                                        // headerName={'Number of regular windows'}
                                        modalHeader={'Number of medium windows'}
                                        PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                        data={[
                                            { label: '1', value: '1', key: 1 },
                                            { label: '2', value: '2', key: 2 },
                                            { label: '3', value: '3', key: 3 },
                                            { label: '4', value: '4', key: 4 },
                                            { label: '5', value: '5', key: 5 },
                                            { label: '6', value: '6', key: 6 },
                                            { label: '7', value: '7', key: 7 },
                                        ]}
                                        placeholder={`Medium Windows(${windowCleaningInside.mediumRegularWindows})`}
                                        value={windowCleaningInside.mediumRegularWindows}
                                        onChange={(value) => {
                                            handlechangeWcInside("mediumRegularWindows", value)
                                        }}
                                    />
                                    <InputPicker
                                        buttonStyle={{ width: "95%" }}
                                        //headerName={'Number of regular windows'}
                                        modalHeader={'Number of large windows'}
                                        PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                        data={[
                                            { label: '1', value: '1', key: 1 },
                                            { label: '2', value: '2', key: 2 },
                                            { label: '3', value: '3', key: 3 },
                                            { label: '4', value: '4', key: 4 },
                                            { label: '5', value: '5', key: 5 },
                                            { label: '6', value: '6', key: 6 },
                                            { label: '7', value: '7', key: 7 },
                                        ]}
                                        placeholder={`Large Windows(${windowCleaningInside.largeRegularWindows})`}
                                        value={windowCleaningInside.largeRegularWindows}
                                        onChange={(value) => {
                                            handlechangeWcInside("largeRegularWindows", value)
                                        }}
                                    />
                                </View> : null
                            }
                            <View style={styles.switchToggle}>
                                <Text style={{ marginRight: 30, width: '80%' }}>Do you have Storm windows</Text>
                                <Switch
                                    value={isStromWindow}
                                    onValueChange={(val) => setIsStromWindow(val)}
                                />
                            </View>
                            {
                                isStromWindow ?
                                    <InputPicker
                                        buttonStyle={{ width: "95%" }}
                                        headerName={'Size of storm windows'}
                                        modalHeader={'Size of storm windows'}
                                        PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                        data={[
                                            { label: 'Heavy', value: 'Heavy', key: 1 },
                                            { label: 'Medium', value: 'Medium', key: 2 },
                                            { label: 'Light', value: 'Light', key: 3 },
                                        ]}
                                        value={stromWindows}
                                        onChange={(value) => {
                                            setStromWindows(value)
                                        }}
                                    /> : null
                            }
                            <View style={styles.switchToggle}>
                                <Text style={{ marginRight: 30, width: '80%' }}>Do you have Screens</Text>
                                <Switch
                                    value={haveScreen}
                                    onValueChange={(val) => setHaveScreen(val)}
                                />
                            </View>
                            {
                                haveScreen ?
                                    <InputPicker
                                        buttonStyle={{ width: "95%" }}
                                        headerName={'Number of screens'}
                                        modalHeader={'Number of screens'}
                                        PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                                        data={[
                                            { label: '1', value: '1', key: 1 },
                                            { label: '2', value: '2', key: 2 },
                                            { label: '3', value: '3', key: 3 },
                                            { label: '4', value: '4', key: 4 },
                                            { label: '5', value: '5', key: 5 },
                                            { label: '6', value: '6', key: 6 },
                                            { label: '7', value: '7', key: 7 },
                                        ]}
                                        value={screens}
                                        onChange={(value) => {
                                            setScreens(value)
                                        }}
                                    /> : null
                            }

                            <View style={[styles.modalButton]}>
                                <RippleButton
                                    buttonView={{ alignItems: 'center' }}
                                    ButtonText={"Cancel"}
                                    button={styles.backButton}
                                    onPress={() => onCancel()}
                                />
                                <RippleButton
                                    buttonView={{ alignItems: 'center', paddingLeft: 30 }}
                                    ButtonText={"Save"}
                                    buttonTextStyle={[styles.buttonText, props.rightButtonTextStyke]}
                                    button={[styles.button, props.rightButtonStyle]}
                                    onPress={() => onselect()}
                                    isDisable={props.isDisable}
                                    indicator={indicator}
                                />
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }



    const dp = (
        <Modal
            transparent
            ref={modal}
            visible={props.isVisible}
            onRequestClose={close}
            animationType={animationType}>
            {renderOptionList()}
        </Modal>
    )

    return (

        <Modal
            transparent
            ref={modal}
            visible={props.isVisible}
            onRequestClose={close}
            animationType={animationType}>
            {renderOptionList()}
        </Modal>

    );
}

WindowWashingInput.defaultProps = {
    data: [],
    onChange: () => { },
    onCancel: () => { },
    onselect: () => { },
    initValue: 'Select me!',
    style: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel',
    isVisible: false
}

export default WindowWashingInput
