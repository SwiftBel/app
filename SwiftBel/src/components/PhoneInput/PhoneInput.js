import React, { useState, useRef } from 'react'
import {
  View,Text
} from 'react-native'
import PhoneInput from 'react-native-phone-number-input'
import { palette } from '../../theme'
import { formatMobileNumber } from '../../utils/CommonFunctions'
import styles from './StylesPhoneInputField'
const PhoneInpuField = (props) => {
  const [value, setValue] = useState("");
  const phoneRef = useRef(null)
  const [bordrColor,SetBorderColor]=useState(false)
  const onChangeText=(text)=>{
    props.onChangeText(text);
    let formatedNo = formatMobileNumber(text);
    setValue(formatedNo);
  }
  const handleFocus=()=>{
    console.log(bordrColor,"color")
    SetBorderColor(true)

  }
  const handleBlur=()=>{
    console.log(bordrColor,"color")
    SetBorderColor(false)

  }
  return (
      <View style={[styles.phonInputContainer,props.PhoneInputContainer,{borderColor:bordrColor?palette.black:palette.lightGrey}]}>
        <PhoneInput
          containerStyle={{ width: '100%',alignItems:'center' }}
          textContainerStyle={[styles.phoneInputTextStyle,{borderColor:bordrColor?palette.black:palette.lightGrey}]}
          textInputStyle={{ fontSize: 14 ,color:'black',alignItems:'center',height:50}}
          ref={phoneRef}
          initialCountry={'CA'}
          defaultCode='CA'
          flagButtonStyle={styles.flagStyle}
          offset={10}
          allowZeroAfterCountryCode
          placeholder='(123) 455-6789'
          onChangeText={(text)=>onChangeText(text)}
          onChangeFormattedText={(text) => {
            props.onChangeFormattedText(text);
          }}
          codeTextStyle={{fontSize:14}}
          textInputProps={{
            value:props.value?props.value:value,
            maxLength:14,
            placeholderTextColor:palette.grey,
            placeholder:'(123) 455-6789',
            onBlur:handleBlur,
            onFocus:handleFocus,
            blurOnSubmit:false
          }}
        />
        {
              props.errorMessage?
              <Text style={[styles.errorMessage,{ color:palette.pink}]}> {props.errorMessage}</Text>
              :null
            }
      </View>
  )
}

export default PhoneInpuField;