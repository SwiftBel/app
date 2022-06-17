import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, Text,Image, ScrollView, TouchableOpacity } from 'react-native'
import styles from './style'

const ModalPicker = props => {

  const [animationType, setAnimationType] = useState('slide')
  const [modalVisible, setModalVisible] = useState(false)
  const [selected, setSelected] = useState('please select')
  const [data, setData] = useState([])
  const modal = useRef(null)

  useEffect(() => {
    setSelected(props.initValue)
    setData(props.data)
    setModalVisible(props.visible)
  })

  const close = () => {
    setModalVisible(false)
  }

  const onChange = item => {
    props.onChange(item)
    setSelected(item.label)
   // props.onCancel()
  }

  const renderOption = option => {
    return (
      <TouchableOpacity key={option.key} onPress={() => onChange(option)}>
        <View style={[styles.optionStyle, props.optionStyle]}>
          <View style={{ flex: 1, alignItems: 'center',justifyContent:'center'}}>
            <Text style={[styles.optionTextStyle, props.optionTextStyle]}>
              {option.label}
            </Text>
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
        <View style={[styles.optionContainer,props.optionContainer]}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ paddingHorizontal: 10 }}>{options}</View>
          </ScrollView>
        </View>
        <View style={[styles.cancelContainer,props.cancelContainers]}>
          <TouchableOpacity onPress={() => props.onCancel()}>
            <View style={[styles.cancelStyle, props.cancelStyle]}>
              <Text style={[styles.cancelTextStyle, props.cancelTextStyle]}>
                {props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
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

  return <View style={props.style}>{dp}</View>
}

ModalPicker.defaultProps = {
  data: [],
  onChange: () => {},
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

export default ModalPicker
