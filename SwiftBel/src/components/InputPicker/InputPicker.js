import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, Modal, TouchableOpacity, Image } from 'react-native';

import { Picker } from '@react-native-community/picker';
import styles from './style'
import { RippleButton } from '..';
import moment from 'moment';
import { chevrondown } from '../../assets';
import { palette } from '../../theme';
const DatesPicker = (props) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [value, setValue] = useState("Male")
  const showPicker = () => {
    setIsPickerShow(true);
  };
  const data = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'O' },
  ]
  const onChange = (value) => {
    props.onChange(value)
    console.log(value, "value")
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
      setOnFocus(false)
    }
  };
  const onselect = (date) => {
    setIsPickerShow(false)
    setOnFocus(false)
    props.OnSelected(date)? props.OnSelected(date):null;;;
  }
  const onCancel = () => {
    props.onCancel();
    setIsPickerShow(false);
    setOnFocus(false)
  }
  const renderDataAndroid = () => {
    return (
      <View style={[styles.PickerButton, props.buttonStyle, { borderColor: onFocus ? palette.black : palette.lightGrey, marginLeft: 12, backgroundColor: 'white' }]}>
        <Image
          source={chevrondown}
          resizeMode='contain'
          style={[styles.modalAndroidIcon]}
        />
        <Picker
          mode='dialog'
          style={{ width: '120%', height: 40, backgroundColor: 'transparent' }}
          selectedValue={props.value}
          itemStyle={{ color: 'white' }}
          onValueChange={(itemValue, itemIndex) =>{
            onselect(itemValue)
            onChange(itemValue);}
          }
        >
          {props.data.map(item => <Picker.Item label={item.label} value={item.value} key={item.key} />)}
        </Picker>
      </View>
    )
  }
  const renderPickerIOS = () => {

    const renderOptionList = () => {
      return (
        <View style={[styles.overlayStyle, props.overlayStyle]}>
          <View style={[styles.optionContainer, props.optionContainer]}>
            <Text style={{ textAlign: 'center', padding: 20 }}>{props.modalHeader}</Text>
            {isPickerShow && (
              <Picker
                mode='dialog'
                selectedValue={props.value}
                itemStyle={{ height: 130 }}
                onValueChange={(itemValue, itemIndex) => {
                  onChange(itemValue)
                }
                }>
                {props.data.map(item => <Picker.Item label={item.label} value={item.label} key={item.key} />)}
              </Picker>
            )}
            <View style={styles.modalButton}>
              <RippleButton
                buttonView={{ alignItems: 'center' }}
                ButtonText={"Cancel"}
                button={styles.backButton}
                onPress={() => onCancel()}
              />
              <RippleButton
                buttonView={{ alignItems: 'center', paddingLeft: 30 }}
                ButtonText={"Select"}
                buttonTextStyle={[styles.buttonText, props.rightButtonTextStyke]}
                button={[styles.button, props.rightButtonStyle]}
                onPress={() => onselect()}
                isDisable={props.isDisable}
                indicator={props.rightIndicator}
              />
            </View>
          </View>
        </View>
      )
    }
    return <View>
      <Modal
        transparent
        visible={isPickerShow}
        animationType={"slide"}>
        {renderOptionList()}
      </Modal>
    </View>
  }
  return (
    <View style={[props.PickerContainerStyle,{alignItems:'center'}]} >
      <View style={{borderWidth:1,padding:10,borderRadius:10,width:'95%',borderColor:palette.lightGrey}}>
      {props.headerName ? <Text style={styles.headerText}>{props.headerName}</Text> : null}
      {Platform.OS == 'android' ? null : <View style={[styles.btnContainer]}>
        <TouchableOpacity onPress={() => {
          showPicker(true)
          setOnFocus(true)
        }} style={[styles.PickerButton, props.buttonStyle, { borderColor: onFocus ? palette.black : palette.lightGrey }]}>
          <View style={styles.PickerButtonContainer}>
            <Text style={styles.PickerButtontext}>{props.placeholder?props.placeholder:props.value}</Text>
            <Image
              source={chevrondown}
              resizeMode='contain'
              style={styles.Icon}
            />
          </View>
        </TouchableOpacity>
       
      </View>}
      {Platform.OS == 'android' ? renderDataAndroid() : renderPickerIOS()}
      </View>
    </View>
  );
};
DatesPicker.defaultProps = {
  data: [],
  value: '',
  onChange: () => { },
  headerName: '',
  onCancel: () => { },
  OnSelected: () => { },
  placeholder:'',
  modalHeader:''
}
export default DatesPicker;
