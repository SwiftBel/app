import React from 'react';
import {View, Text} from 'react-native';
import styles from './Style';
import {Button} from 'react-native-paper';
import { palette } from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RnIncrementDecrementBtn = ({
  val,
  minVal,
  max,
  disableControl,
  minreq,
  handleClick,
  styleTextInput,
  styleBtn,
  disabledColor,
  activeColor,
  labelStyle,
}) => {
  // console.log(typeof labelFontSize);
  const [value, changeValue] = React.useState(0);
  const [count, changeCount] = React.useState(10);
  const [minReq, addMinReq] = React.useState(0);
  const [min, addMinValue] = React.useState(0);
  const [leftBtnDisable, changeLeftBtnDisable] = React.useState(false);
  const [rightBtnDisable, changeRightBtnDisable] = React.useState(false);
  const [disableColorBtn, addDisableColor] = React.useState(palette.lightGrey);
  const [activeColorBtn, addActiveColor] = React.useState(palette.black);

  React.useEffect(() => {
    if (val) {
      changeValue(val);
    }
    if (max) {
      changeLeftBtnDisable(max <= 0);
      changeCount(max - 0);
    }
    if (minreq) {
      addMinReq(minreq);
    }
    // if (val && max) {
    //   changeCount(max - val);

    //   changeRightBtnDisable(val <= 0);
    // }
    if(minVal){
      changeRightBtnDisable(value<=minVal);
      addMinValue(minVal);
    }
    if(disabledColor){
      addDisableColor(disabledColor);
    }
    if(activeColor){
      addActiveColor(activeColor);
    }
  }, [val, max, minreq,minVal,disabledColor,activeColor]);

  // function to handle btn click
  const handlePress = val => {
    handleClick ? handleClick(val) : {};
  };
  return (
    <View style={styles.viewOuter}>
 
 <TouchableOpacity
        style={[
            styles.viewBtnRight,
            {
              backgroundColor:palette.white,
              borderColor:
                rightBtnDisable || disableControl ? disableColorBtn : activeColorBtn,
            },
            styleBtn,
          ]}
         
          disabled={rightBtnDisable || disableControl}
          
          onPress={() => {
            // changeDisable(true);
            if (value - 1 <= min || value - 1 < minReq) {
              changeLeftBtnDisable(false);
              changeRightBtnDisable(true);
              if (value - 1 <= min) {
                changeValue(value - 1);
                changeCount(count + 1);
                handlePress(value - 1);
              }
              if (value - 1 < minReq) {
                changeCount(count + minReq);
                changeValue(0);
                handlePress(0);
              }
            } else {
              changeLeftBtnDisable(false);
              changeCount(count+1);
              changeValue(value - 1);
              handlePress(value - 1);
            }
          }}>
         <Text style={[styles.btnLabelStyle,{ color: rightBtnDisable || disableControl ? disableColorBtn : activeColorBtn,}]}> - </Text>
        </TouchableOpacity>
        
      <View style={[styles.viewTextInput,styleTextInput]}>
        <Text style={[{color: '#000000'},labelStyle ? labelStyle : styles.labelStyle]}>{value}</Text>
      </View>
      <TouchableOpacity
          disabled={leftBtnDisable || disableControl}
          style={[styles.viewBtnLeft,{
            backgroundColor:palette.white,
            borderColor: leftBtnDisable || disableControl ? disableColorBtn : activeColorBtn,
          }, styleBtn]}
          onPress={() => {
            if (count - 1 <= 0) {
              changeCount(0);
              changeRightBtnDisable(false);
              changeLeftBtnDisable(true);
              changeValue(value + 1);
            } else {
              if (value < minReq) {
                changeCount(count - minReq);
                changeValue(value + minReq);
                handlePress(value + minReq);
              } else {
                changeCount(count - 1);
                changeValue(value + 1);
                handlePress(value + 1);
              }
              changeRightBtnDisable(false);
            }
          }}>
        <Text style={[styles.btnLabelStyle,{ color: leftBtnDisable || disableControl ? disableColorBtn : activeColorBtn,}]}>+</Text> 
        </TouchableOpacity>
  
    
      
    </View>
  );
};

export default RnIncrementDecrementBtn;