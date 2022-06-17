import { TouchableOpacity,TextInput,View,Image,Text } from "react-native";
import React,{useState,useEffect,useRef} from 'react'
import { palette } from "../../theme/index";
//import { validate } from "../../utils/functions";
import Style from "./Styles";
import { Caution ,Right} from "../../assets";
import { EmailValidation } from "../../utils/CommonFunctions";
import { heightPercentageToDP } from "../../utils/Responsive";
function SearchInput(props) {
  const [error, setError] = useState("");
  const [borderColor,setBorderColor]=useState(palette.lightGrey)
  const [icon,setIcon]=useState(0)
  const [secure,setSecure]=useState(true)
  const [secureText,setSecureText]=useState(true)
  const [isFocused,setIsfocused]=useState(false)

  const handleFocus=()=>{
    props.handleFocus && props.handleFocus()
    setIsfocused(true)
    setBorderColor(palette.black)

  }
  const handleBlur=()=>{
    props.handleBlur && props.handleBlur()
    setIsfocused(true)
    setBorderColor(palette.lightGrey)

  }
  const emailValidation=(val)=>{
      const validation=EmailValidation(val);
      if(validation)
      {
        setBorderColor(palette.black)
        setIcon(Right)
      }
      else
      {
          setBorderColor(palette.pink)
          setIcon(Caution)
      }
  }

  const showHidePassword=()=>{
  secureText?
  setSecureText(false):
  setSecureText(true)
    
}
  return (
    <View style={[props.inputContainer]}>
      <View style={{...Style.container,...props.inputStyle,borderColor:props.borderColor?props.borderColor:borderColor}}>
      {
                props.leftIcon?
                <Image
                source={props.leftIcon}
                style={{...Style.Logo_Style,...props.iconStyle}}
                resizeMode='contain'
                />:null
            }
    <TextInput
              
                underlineColorAndroid="transparent"
                {...props}
                // Margin is for the keyboard Avoid View and padding for shift the View up
                style={[{
                 width:'90%',
                 color:palette.black
                },props.inputContainerStyle]}
                placeholder={
                  props.placeholder ? props.placeholder :''
                }
                onFocus={handleFocus}
                onBlur={handleBlur}
                accessible={true} 
                keyboardType={props.keyboardType?props.keyboardType:'default'}
                value={props.value}
                returnKeyType={'next'}
                multiline={props.multiline?props.multiline:false}
                onSubmitEditing={props.onSubmitEditing}
                secureTextEntry={props.showHide?secureText:props.secureText?secureText: props.secureTextEntry}
                //isFromMpin={props.isFromMpin}
                placeholderTextColor={palette.grey}
                onChangeText={(val) => {
                  console.log(val,"vallll")
                props.onChangeText(val);
              
                }}
              ></TextInput>
          
          
        </View>
            {
              props.errorMessage?
              <Text style={[Style.PasswordValidation,{ color:palette.pink}]}> {props.errorMessage}</Text>
              :null
            }
        </View>
  );
}
export default SearchInput;