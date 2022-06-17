import React from 'react'
import {KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Keyboard, Platform} from 'react-native'
const KeyBoardAvoidingWrapper=({style,children})=>{

    return(
        <KeyboardAvoidingView  style={style} behavior={Platform.OS=='ios'?'padding':'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
export default KeyBoardAvoidingWrapper;