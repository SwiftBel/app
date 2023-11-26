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
const CleaningInput = props => {
    const dispatch = useDispatch()
    const [animationType, setAnimationType] = useState('slide')
    const [indicator, setIndicator] = useState(false)
    const [cleaningDetails, setCleaningDetails] = useState({
        "startingAddress": '',
        "numOfRom": '2',
        "ApproxSize": 'Select',
        "numofBathrom": '2',
        "typeOfFloor": 'Slect',
        "apply": 'Select'
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

                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', flex: 1 }}>
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
                            headerName={'Approx. square footage of your house'}
                            modalHeader={'Approx. square footage of your house'}
                            PickerContainerStyle={{ width: '100%', marginBottom: 10,marginTop:50 }}
                            data={[
                                { label: '600 Sq.Ft. - 1000 Sq.Ft.', value: '600 Sq.Ft. - 1000 Sq.Ft.', key: 1 },
                                { label: '1000 Sq.Ft. - 1500 Sq.Ft.', value: '1000 Sq.Ft. - 1500 Sq.Ft.', key: 2 },
                                { label: '1500 Sq.Ft. - 2000 Sq.Ft.', value: '1500 Sq.Ft. - 2000 Sq.Ft.', key: 3 },
                                { label: '2000 Sq.Ft. – 2500 Sq.Ft.', value: '2000 Sq.Ft. – 2500 Sq.Ft.', key: 4 },
                                { label: '2500 Sq.Ft. – 3000 Sq.Ft.', value: '2500 Sq.Ft. – 3000 Sq.Ft.', key: 5 },
                            ]}
                            value={cleaningDetails.ApproxSize}
                            onChange={(value) => {
                                handlechange("ApproxSize", value)
                            }}
                        />
                        <InputPicker
                            buttonStyle={{ width: "95%" }}
                            headerName={'Number of rooms to be cleaned'}
                            modalHeader={'Number of rooms to be cleaned'}
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
                            value={cleaningDetails.numOfRom}
                            onChange={(value) => {
                                handlechange("numOfRom", value)
                            }}
                        />
                        <InputPicker
                            buttonStyle={{ width: "95%" }}
                            headerName={'Number of bathrooms to be cleaned'}
                            modalHeader={'Number of bathrooms to be cleaned'}
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
                            value={cleaningDetails.numofBathrom}
                            onChange={(value) => {
                                handlechange("numofBathrom", value)
                            }}
                        />
                        <InputPicker
                            buttonStyle={{ width: "95%" }}
                            headerName={'Type of Floor'}
                            modalHeader={'Type of Floor'}
                            PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                            data={[
                                { label: 'Laminate', value: 'Laminate', key: 1 },
                                { label: 'Wooden', value: 'Wooden', key: 2 },
                                { label: 'Tiles', value: 'Tiles', key: 3 },

                            ]}
                            value={cleaningDetails.typeOfFloor}
                            onChange={(value) => {
                                handlechange("typeOfFloor", value)
                            }}
                        />
                        <InputPicker
                            buttonStyle={{ width: "95%" }}
                            headerName={'Select which apply'}
                            modalHeader={'Select which apply'}
                            PickerContainerStyle={{ width: '100%', marginBottom: 10 }}
                            data={[
                                { label: 'Oven cleaning', value: 'Oven cleaning', key: 1 },
                                { label: 'Deep clean', value: 'Deep clean', key: 2 },
                                { label: 'Pets', value: 'Pets', key: 3 },
                                { label: 'Move out cleaning', value: 'Move out cleaning', key: 4 },
                            ]}
                            value={cleaningDetails.apply}
                            onChange={(value) => {
                                handlechange("apply", value)
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

CleaningInput.defaultProps = {
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

export default CleaningInput
