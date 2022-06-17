import React, { useState, useCallback } from 'react';
import { Modal, Platform, SafeAreaView, StyleSheet, Text,Image, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import MonthPicker from 'react-native-month-year-picker';
import { Back, chevrondown } from '../../assets';
import { palette } from '../../theme';
import styles from './Style'

const DEFAULT_OUTPUT_FORMAT = 'MM/YYYY';

const MonthInput = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      props.onValueChange(selectedDate)
    },
    [date, showPicker],
  );
  const  renderDataPickerForIos=()=>{
    return(
      show && (
        <Modal
        animationType='slide'
        transparent={true}
        visible={show}
        onRequestClose={()=>{
          setShow(false)
        }}
        >
        <View style={{flex:1,position:'absolute',bottom:10}}>
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={props.minimumDate?props.minimumDate:new Date(1895)}
          maximumDate={props.maximumDate?props.maximumDate:new Date()}
          locale="en"
          mode="full"
          autoTheme={false}
        />
        </View>
        </Modal>
      )
    )
  }
  const renderDataPickerForAndroid=()=>{
    return(
      show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={props.minimumDate?props.minimumDate:new Date(1895)}
          maximumDate={props.maximumDate?props.maximumDate:new Date()}
          locale="en"
          mode="full"
          autoTheme={false}
        />
      )
    )
  }
  return (
    <SafeAreaView>
     { props.headerName?<Text style={styles.headerText}>{props.headerName}</Text>:null}
       <TouchableOpacity onPress={() => showPicker(true)} style={[styles.button,props.buttonStyle]}>
        <View style={styles.Buttoncontainer}>
        <Text style={styles.buttonText}>{props.value?props.value:moment(date).format(DEFAULT_OUTPUT_FORMAT)}</Text>
        <Image
          source={chevrondown}
          resizeMode='contain'
          style={styles.Icon}
          />
        </View>
      </TouchableOpacity>
      {
        Platform.OS=== 'ios'?
        renderDataPickerForIos():
        renderDataPickerForAndroid()
      }
      
      </SafeAreaView>
  );
};
MonthInput.defaultProps={
  onValueChange:()=>{},
  headerName:'',
  value:'',
  buttonStyle:{}
}

export default MonthInput;