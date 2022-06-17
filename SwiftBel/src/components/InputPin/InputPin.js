import React, { useEffect, useRef, useState } from "react";
import {View,TextInput, Keyboard,Text} from 'react-native';
import { palette } from "../../theme";
import { focusField, handleChangeText } from "../../utils/CommonFunctions";
import KeyBoardAvoidingWrapper from "../KeyBoardAvoidingWrapper";
import Style from './InputPinStyle'

const pinCount = 6;
const InputPin=(props)=>{
    const [onFocus,setOnFocus]=useState(false)
    const [digits, setDigits] = useState([]);
    const fields = useRef([]);
   // const [onnfocus,setOnFocus]=useState([false,false,false,false,false,false])

    // useEffect(()=>{
      
    // },[])
  const changeTextHandle = async (index, text) => {
    const newDigits = handleChangeText(index, text, digits, pinCount);
    setDigits(newDigits);
    const result = newDigits.join('');
    if (text.length > 0 && index < pinCount - 1) {
      focusField(index + 1, fields);
    }
    if (result.length === 6) {
      focusField(pinCount - 1, fields);
      Keyboard.dismiss();
    }
    console.log(result,"difg")
    props.onChangeText(result)?props.onChangeText(result):null
  };
  const handleKeyPressTextInput = (index, key) => {
    if (key === 'Backspace') {
      if (!digits[index] && index > 0) {
        changeTextHandle(index - 1, '');
        focusField(index - 1, fields);
      }
    }
  };
  // const onFocus=(index)=>{
  //   const focus=onnfocus
  //   focus[index-1]=true
  //   setOnFocus(focus)
  // }
  // const onBlur=(index)=>{
  //   const focus=onnfocus
  //   focus[index-1]=false
  //   setOnFocus(focus)
  // }
    const array = new Array(6).fill(0);
    return(
        <View>
            <View style={{flexDirection:'row',justifyContent:'center',margin:20}}>
                {
                    
                    array.map((_, index) => {

                        return(
                            <KeyBoardAvoidingWrapper>
                            <View style={{
                                ...Style.inputContainer,
                                borderWidth:onFocus?index===digits.length ?1:0:0,
                            }}
                            key={index}
                            >
                                <TextInput
                                value={digits[index]}
                                ref={(ref) => { fields.current[index] = ref; }}
                                maxLength={1}
                                keyboardType={'phone-pad'}
                                style={Style.textInputStyle}
                                onKeyPress={({ nativeEvent: { key } }) => { handleKeyPressTextInput(index, key); }}
                                onChangeText={text=>{
                                    changeTextHandle(index, text);
                                }}
                               onBlur={()=>{
                                 setOnFocus(false)
                               }}
                               onFocus={()=>{
                                setOnFocus(true
                                  )
                                // onFocus()
                               }}
                                />
                            </View>
                            </KeyBoardAvoidingWrapper>
                        )
                    })
                }

            </View>
            {
              props.errorMessage?
              <Text style={[Style.PasswordValidation,{ color:palette.pink}]}> {props.errorMessage}</Text>
              :null
            }
        </View>
    )
}
export default InputPin;