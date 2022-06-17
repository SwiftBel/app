import React from 'react'
import
{
View
} from 'react-native'
import {
    RippleButton,
} from '../../../components/index'
import { palette } from '../../../theme'
import Constants from '../../../utils/Constant'
import Style from '../Style'
const BottomButton=(props)=>{
    return(
        <View style={[Style.locationBottomContainer,props.bottomContainer]}>
        <RippleButton
            buttonView={{ alignItems: 'center' }}
            ButtonText={props.leftButtonText}
            buttonTextStyle={{color:palette.grey}}
            button={Style.backButton}
            onPress={() => props.onPressLeft()}
        />
        <RippleButton
            buttonView={{ alignItems: 'center', paddingLeft: 30 }}
            ButtonText={props.rightButtonText}
            buttonTextStyle={[Style.buttonText,props.rightButtonTextStyke]}
            button={[Style.button,props.rightButtonStyle]}
            onPress={() => props.onPressRight()}
            isDisable={props.isDisable}
            indicator={props.rightIndicator}
        />
    </View>
    )
}
export default BottomButton;