import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { chevrondown, Cross, Delete, info } from '../../assets'
import { palette } from '../../theme'
import InputPicker from '../../components/InputPicker/InputPicker'
import styles from './Style'
import { Input, RippleButton } from '../../components'
import { useDispatch } from 'react-redux'
import { getMovingInputDetails } from '../../store/actions/Profile.action'
import ShowDataModal from './Components/ShowDataModal'
import { listOfHVACResolved,listOfACResolved } from './Components/listofFormData'
import { getHVACInputDetails } from '../../store/actions/UserInput'
import MapSearchInput from '../../components/MapSearchInput'
const HVACINput = props => {
    const dispatch = useDispatch()
    const [animationType, setAnimationType] = useState('slide')
    const [modalVisible, setModalVisible] = useState(false)
    const [acModalVisible, setAcModalVisible] = useState(false)
    const [indicator, setIndicator] = useState(false)
    const [Estimatedhour, setEstimatedHour] = useState('Select')
    const [startingAddress, setStartingAddress] = useState("")
    const modal = useRef(null)
    const close = () => {
        // setModalVisible(false)

    }
    const onselect = async () => {
        setIndicator(true)
        const data = {
            "fromAddress": startingAddress,
            "estimatedHourOfWork":Estimatedhour

        }
        const res = await dispatch(getHVACInputDetails(data))
        props.onCancel();
        setIndicator(false)
    }


    const renderOptionList = () => {

        return (
            <View
                style={[styles.overlayStyle, props.overlayStyle]}
            >
                <View style={[styles.optionContainer, props.optionContainer]}>
                    <View style={{ height: 40, justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: 20, flexDirection: 'row' }}>
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
                                onPress={(data) => setStartingAddress(data.description)}
                                onLocation={(location) => console.log(location)}
                                placeholder={'Starting Address'}
                                textInputStyle={{ borderWidth: 1, borderColor: palette.lightGrey, height: 50 }}
                            />
                        </View>
                        <InputPicker
                            buttonStyle={{ width: "95%" }}
                            headerName={'Estimated hours of work'}
                            modalHeader={'Estimated hours of work'}
                            PickerContainerStyle={{ width: '100%', marginBottom: 10,marginTop:50 }}
                            data={[
                                { label: 'less than 2 hours ', value: 'less than 2 hours', key: 1 },
                                { label: '2 to 3 hour', value: '2 to 3 hour', key: 2 },
                                { label: '3 hours +', value: '3 hours +', key: 3 },
                            ]}
                            value={Estimatedhour}
                            onChange={(value) => {
                                setEstimatedHour(value)
                            }}
                        />
                        <ShowDataModal
                            data={listOfHVACResolved}
                            headerTitle={"Top 10 HVAC problems (summary)"}
                            isVisible={modalVisible}
                            onCancel={() => setModalVisible(false)}
                        />
                        <Text style={styles.headerText}>{"List of services that get resolved in 1-2 hours"}</Text>
                        <View style={[styles.btnContainer]}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true)
                            }} style={[styles.PickerButton, { borderColor: palette.lightGrey }]}>
                                <View style={styles.PickerButtonContainer}>
                                    <Text style={styles.PickerButtontext}>{"Show more HVAC detail"}</Text>
                                    <Image
                                        source={info}
                                        resizeMode='contain'
                                        style={styles.Icon}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <ShowDataModal
                            data={listOfACResolved}
                            headerTitle={"Top 10 air conditioner problems"}
                            isVisible={acModalVisible}
                            onCancel={() => setAcModalVisible(false)}
                        />
                        <Text style={styles.headerText}>{"List of services that get resolved in 1-2 hours"}</Text>
                        <View style={[styles.btnContainer]}>
                            <TouchableOpacity onPress={() => {
                                setAcModalVisible(true)
                            }} style={[styles.PickerButton, { borderColor: palette.lightGrey }]}>
                                <View style={styles.PickerButtonContainer}>
                                    <Text style={styles.PickerButtontext}>{"Show more AC detail"}</Text>
                                    <Image
                                        source={info}
                                        resizeMode='contain'
                                        style={styles.Icon}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

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

HVACINput.defaultProps = {
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

export default HVACINput
