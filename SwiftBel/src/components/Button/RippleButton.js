import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { palette } from '../../theme';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'
const RippleButton = ({
    ButtonText,
    onPress,
    buttonView,
    button,
    buttonTextStyle,
    indicator,
    isDisable = false,
}) => (
    <View style={buttonView}>
        {
            indicator ?
                (
                    <View style={[style.indicatorStyle,button,{backgroundColor:palette.smokeWhite}]}>
                        <ActivityIndicator size='small' color={palette.grey} animating={indicator} />
                        <Text style={{color:palette.grey,marginLeft:20}}>Loading...</Text>
                    </View>
                ) : (
                    <View >
                        <TouchableOpacity onPress={onPress} disabled={isDisable} style={button} activeOpacity={0.8}>
                            <Text style={buttonTextStyle}>{ButtonText}</Text>
                        </TouchableOpacity>
                    </View>)
        }
    </View>
);
RippleButton.propTypes = {
    isDisable: PropTypes.bool,
    ButtonText: PropTypes.string,
    onPress: PropTypes.func,
    buttonView: PropTypes.any,
    button: PropTypes.any,
    buttonTextStyle: PropTypes.any,
    indicator:PropTypes.any
};

const style=StyleSheet.create({
    indicatorStyle:{
         backgroundColor:'#ebecf0',
         height:44,
         width:wp('40%'),
         borderRadius:22,
         //justifyContent:'space-between',
         paddingLeft:wp('4%'),
         paddingRight:wp('3%'),
         alignItems:'center',
         marginBottom:hp("2%"),
         flexDirection:'row'
    }
})
export default RippleButton;