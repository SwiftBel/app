import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { chevrondown, Cross, Delete, userShade } from '../../assets'
import styles from './Style'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-native-modal'
const TopbottomModal = props => {
    const dispatch = useDispatch()
    const [animationType, setAnimationType] = useState('slide')
    const [modalVisible, setModalVisible] = useState(false)

    const modal = useRef(null)


    const close = () => {
        setModalVisible(false)

    }


    const onselect = async () => {

    }


    const renderOptionList = () => {

        return (
            <View
                style={[styles.overlayStyle, props.overlayStyle]}
            >
                <View style={[styles.optionContainer, props.optionContainer]}>
                    <View style={{ height: 50, justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: 20, flexDirection: 'row' }}>
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
            animationIn={'slideInUp'}
            animationInTiming={300}
            onSwipeComplete={props.onCancel}
            animationType={animationType}>
            {renderOptionList()}
        </Modal>

    );
}

TopbottomModal.defaultProps = {
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
    isVisible: false,
    onPressRight: () => { },
}

export default TopbottomModal
