import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { chevrondown, Cross, Delete, info } from '../../assets'
import { palette } from '../../theme'
import InputPicker from '../../components/InputPicker/InputPicker'
import styles from './Style'
import { Input, RippleButton } from '../../components'
import { useDispatch } from 'react-redux'
import ShowDataModal from './Components/ShowDataModal'
import { listOfPlumberResolved } from './Components/listofFormData'
import { getPlumberInputDetails } from '../../store/actions/UserInput'
import MapSearchInput from '../../components/MapSearchInput'
const GuterCleaning = props => {
    const dispatch = useDispatch()
    const [animationType, setAnimationType] = useState('slide')
    const [indicator, setIndicator] = useState(false)
    const [cleaningDetails, setCleaningDetails] = useState({
        "startingAddress": '',
        "numOfFloor": '2',
        "ApproxSize": 'Select',
    })

    const modal = useRef(null)
    const close = () => {
        // setModalVisible(false)

    }
    const handlechange = (name, value) => {
        setCleaningDetails({ ...cleaningDetails, [name]: value })
    }
    const onselect = async () => {
        setIndicator(true)

        const res = await dispatch(getPlumberInputDetails(cleaningDetails))
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

                    <View style={{ paddingHorizontal: 10, flex: 1 }}>

                        <View style={styles.dragView}>
                            <Text style={{ margin: 5 }}>Starting Address</Text>
                            <MapSearchInput
                                disableScroll={true}
                                listView={{ height: 140, width: '97%', borderWidth: 1, marginLeft: 5, marginBottom: 10, borderRadius: 15, borderColor: palette.lightGrey, position: 'absolute', marginTop: 55 }}
                                onPress={(data) => handlechange('startingAddress', data.description)}
                                onLocation={(location) => console.log(location)}
                                placeholder={'Starting Address'}
                                textInputStyle={{ borderWidth: 1, borderColor: palette.lightGrey, height: 50 }}
                            />
                        </View>
                        <InputPicker
                            buttonStyle={{ width: "95%" }}
                            headerName={'How many floors is your house?'}
                            modalHeader={'How many floors is your house?'}
                            PickerContainerStyle={{ width: '100%', marginBottom: 10, marginTop: 50 }}
                            data={[
                                { label: '1', value: '1', key: 1 },
                                { label: '2', value: '2', key: 2 },
                                { label: '3', value: '3', key: 3 },
                                { label: '4', value: '4', key: 4 },
                                { label: '5', value: '5', key: 5 },
                                { label: '6', value: '6', key: 6 },
                                { label: '7', value: '7', key: 7 },
                            ]}
                            value={cleaningDetails.numOfFloor}
                            onChange={(value) => {
                                handlechange("numOfFloor", value)
                            }}
                        />
                        <InputPicker
                            buttonStyle={{ width: "95%" }}
                            headerName={'Approx. sq. ft. of the covered area of the house'}
                            modalHeader={'Approx. sq. ft. of the covered area of the house'}
                            PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                            data={[
                                { label: '< 1000 Sq. Ft.', value: '< 1000 Sq. Ft.', key: 1 },
                                { label: '1000 Sq.Ft. to 1500 Sq.Ft.', value: '1000 Sq.Ft. to 1500 Sq.Ft.', key: 2 },
                                { label: '1500 Sq.Ft. to 2000 Sq.Ft.', value: '1500 Sq.Ft. to 2000 Sq.Ft.', key: 3 },
                                { label: '2000 Sq.Ft. to 2500 Sq.Ft.', value: '2000 Sq.Ft. to 2500 Sq.Ft.', key: 4 },
                                { label: '2500 Sq.Ft. to 3000 Sq.Ft.', value: '2500 Sq.Ft. to 3000 Sq.Ft.', key: 5 },
                            ]}
                            value={cleaningDetails.ApproxSize}
                            onChange={(value) => {
                                handlechange("ApproxSize", value)
                            }}
                        />

                        <View style={[styles.modalButton, { position: 'absolute', bottom: 0 }]}>
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

GuterCleaning.defaultProps = {
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

export default GuterCleaning
