import React from "react";
import {
Text,View
} from 'react-native'
import Style from './Style'
const HorizontalTextKeyValue=(props)=>{

    return(
    <View style={{...Style.container,...props.Container,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={[Style.horizontalKey,props.keyStyle]}>{props.title}</Text>
            <Text numberOfLines={1} style={[Style.horizontalValueStyle,props.valueStyle]}>{props.value?props.value:'__'}</Text>
        </View>
    )
}
HorizontalTextKeyValue.defaultProps = {
    title:'',
    value:'',
    valueStyle:{},
    Container:{},
    keyStyle:{}
}
export default HorizontalTextKeyValue