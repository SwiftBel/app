import React, { useState, useRef } from 'react'
import { View, Modal, Text, Image, TouchableOpacity, Switch } from 'react-native'
import { CheckBox, chevrondown, Cross } from '../../assets'
import { palette } from '../../theme'
import InputPicker from '../../components/InputPicker/InputPicker'
import styles from './Style'
import { RippleButton } from '../../components'
import { useDispatch } from 'react-redux'
import { getPlumberInputDetails } from '../../store/actions/UserInput'
import MapSearchInput from '../../components/MapSearchInput'
const RugCleaningInput = props => {
    const dispatch = useDispatch()
    const [animationType, setAnimationType] = useState('slide')
    const [indicator, setIndicator] = useState(false)
    const [Estimatedhour, setEstimatedHour] = useState('Select')
    const [startingAddress, setStartingAddress] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [smokerInHouse,setSmokerInHouse]=useState(false)
    const [petInHouse,setPetInHouse]=useState(false)
    const [strain, setStrain] = React.useState([])
    const [cleaningDetails, setCleaningDetails] = useState({
        "numOfRom": '2',
        "ApproxSize": 'Select',

    })
    const strainData = [
        "Food stains",
        "Drink stains",
        "Pet stains",
        "Oil / grease stains",
        "General Cleaning"
    ]
    const onAddService = (item) => {
        setStrain([...strain, item])

    }
    const onRemoveServices = (character) => {
        const filteredList = strain.filter(item => item != character)
        setStrain(filteredList)

    }

    //.........Check if Service is exist.....//
    const ifExist = (exist) => {
        if (strain.filter(item =>
            item === exist).length > 0
        ) {
            return true;
        }
        return false
    }
    const modal = useRef(null)
    const close = () => {
        // setModalVisible(false)

    }
    const handlechange = (name, value) => {
        setCleaningDetails({ ...cleaningDetails, [name]: value })
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

                    <View style={{ paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', flex: 1 }}>
                        <InputPicker
                            buttonStyle={{ width: "95%" }}
                            headerName={'Number of rugs to be cleaned'}
                            modalHeader={'Number of rugs to be cleaned'}
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
                        
                        <Text style={styles.headerText}>{"Are there any stains? Select all that apply"}</Text>
                        <View style={[styles.btnContainer]}>
                            <TouchableOpacity onPress={() => {
                                modalVisible ? setModalVisible(false) :
                                    setModalVisible(true)
                            }} style={[styles.PickerButton, { borderColor: palette.lightGrey }]}>
                                <View style={styles.PickerButtonContainer}>
                                    <Text style={styles.PickerButtontext}>{`Selected(${strain.length})`}</Text>
                                    <Image
                                        source={chevrondown}
                                        resizeMode='contain'
                                        style={styles.Icon}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {modalVisible ? <View style={styles.modalContainer}>
                            {
                                strainData.map((item) =>
                                    <View style={{ padding: 5, flexDirection: 'row', }}>
                                        {ifExist(item) ?
                                            <TouchableOpacity style={styles.modalTickButton} onPress={() => {
                                                ifExist(item) ?
                                                    onRemoveServices(item) :
                                                    onAddService(item)
                                            }}>
                                                <Image
                                                    source={CheckBox}
                                                    resizeMode='contain'
                                                    style={{ width: 20, height: 20 }}

                                                />
                                            </TouchableOpacity> :
                                            <TouchableOpacity style={styles.modaluntickButton}
                                                onPress={() => {
                                                    ifExist(item) ?
                                                        onRemoveServices(item) :
                                                        onAddService(item)
                                                }}
                                            />
                                        }
                                        <Text style={{ alignSelf: 'center' }}>{item}</Text>
                                    </View>
                                )
                            }
                        </View> : null}
                        <View style={styles.switchToggle}>
                            <Text style={{marginRight:30}}>Are there any smokers in the house?</Text>
                            <Switch 
                            value={smokerInHouse}
                            onValueChange={(val)=>setSmokerInHouse(val)}
                            />
                        </View>
                        <View style={styles.switchToggle}>
                            <Text style={{marginRight:50}}>Are there any pets in the house? </Text>
                            <Switch 
                            value={petInHouse}
                            onValueChange={(val)=>setPetInHouse(val)}
                            />
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

RugCleaningInput.defaultProps = {
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

export default RugCleaningInput
