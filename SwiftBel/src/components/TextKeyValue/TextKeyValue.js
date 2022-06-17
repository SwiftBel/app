import React from "react";
import {
Text,View
} from 'react-native'
import Style from './Style'
const TextKeyValue=(props)=>{

    return(
        <View style={{...Style.container,...props.Container}}>
            <Text style={Style.keyStyle}>{props.title}</Text>
            <Text style={[Style.ValueStyle,props.valueStyle]}>{props.value?props.value:'__'}</Text>
        </View>
    )
}
TextKeyValue.defaultProps = {
    title:'',
    value:'',
    valueStyle:{},
    Container:{}
}
export default TextKeyValue