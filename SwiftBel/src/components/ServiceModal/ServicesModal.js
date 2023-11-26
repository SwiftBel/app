import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { chevrondown, Cross, Delete } from '../../assets'
import { palette } from '../../theme'

import styles from './Style'

const ServiceModal = props => {

    const [animationType, setAnimationType] = useState('slide')
    const [modalVisible, setModalVisible] = useState(false)
    const [selected, setSelected] = useState('please select')
    const [data, setData] = useState([])
    const modal = useRef(null)

    useEffect(() => {
        setSelected(props.initValue)
        setData(props.data)
        //setModalVisible(props.visible)
    })

    const close = () => {
        setModalVisible(false)
    }

    const onChange = item => {
        props.onChange(item)
        setSelected(item.label)
        setModalVisible(false)
        // props.onCancel()
    }

    const renderOption = option => {
        return (
            <TouchableOpacity key={option.key} onPress={() => onChange(option)}>
                <View style={[styles.optionStyle, props.optionStyle]}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={{ uri: option.url }}
                            resizeMode='contain'
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderOptionList = () => {

        const options = data.map(item => {
            return renderOption(item)
        })

        return (
            <View
                style={[styles.overlayStyle, props.overlayStyle]}
            >
                <View style={[styles.optionContainer, props.optionContainer]}>
                    <View style={styles.serviceContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: 'center' }}>
                            <Image
                                source={Cross}
                                resizeMode='contain'
                                style={{ height: 35, width: 35 }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.modatHeaderText}>Home Services</Text>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                        <View style={{ paddingHorizontal: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>{options}</View>
                    </ScrollView>
                </View>
            </View>
        )
    }



    const dp = (
        <Modal
            transparent
            ref={modal}
            visible={modalVisible}
            onRequestClose={close}
            animationType={animationType}>
            {renderOptionList()}
        </Modal>
    )

    return (
        <View style={props.DateContainerStyle}>
            {props.headerName ? <Text style={styles.headerText}>{props.headerName}</Text> : null}
            <View style={[styles.btnContainer]}>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true)
                }} style={[styles.PickerButton, props.buttonStyle]}>
                    <View style={styles.PickerButtonContainer}>
                        {props.value ?
                            <Text style={styles.PickerButtontext}>{props.value}</Text>
                            : <Text style={[styles.PickerButtontext, { color: palette.grey }]}>{"Home Service"}</Text>}
                        <Image
                            source={chevrondown}
                            resizeMode='contain'
                            style={styles.Icon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {dp}

        </View>
    );
}

ServiceModal.defaultProps = {
    data: [],
    onChange: () => { },
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
}

export default ServiceModal
