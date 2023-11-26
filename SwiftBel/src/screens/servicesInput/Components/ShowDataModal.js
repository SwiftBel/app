import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import styles from '../Style'
import { Input, RippleButton } from '../../../components'
const ShowDataModal = props => {

    const [animationType, setAnimationType] = useState('slide')
    const [modalVisible, setModalVisible] = useState(false)
    const modal = useRef(null)

    const close = () => {
        setModalVisible(false)

    }

    const renderOptionList = () => {

        return (
            <View
                style={[styles.overlayStyle, props.overlayStyle]}
            >
                <View style={[styles.optionContainer, props.optionContainer]}>
                    <View style={{ marginTop:10,marginBottom:20}}>
                        <Text style={styles.listofServicesHeader}>{props?.headerTitle}</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', flex: 1 }}>
                        {props?.data.map((item)=>
                         <Text style={styles.listofServicesText}>{item}</Text>
                        )}
                       
                        <View style={[styles.modalButton, { position: 'absolute', bottom: 0 }]}>
                            <RippleButton
                                buttonView={{ alignItems: 'center',marginLeft:20 }}
                                ButtonText={"Back"}
                                button={styles.button}
                                buttonTextStyle={styles.buttonText}
                                onPress={() => props.onCancel()}
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

ShowDataModal.defaultProps = {
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
    headerTitle:''
}

export default ShowDataModal
