import React from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
const Button = ({
    ButtonText,
    onPress,
    buttonView,
    button,
    buttonTextStyle,
    isDisable = false,
}) => (
    <View style={buttonView}>
        <TouchableOpacity onPress={onPress} disabled={isDisable} style={button} activeOpacity={0.8}>
            <Text style={buttonTextStyle}>{ButtonText}</Text>
        </TouchableOpacity>
    </View>
);
Button.propTypes = {
    isDisable: PropTypes.bool,
    ButtonText: PropTypes.string,
    onPress: PropTypes.func,
    buttonView: PropTypes.any,
    button: PropTypes.any,
    buttonTextStyle: PropTypes.any,
};
export default Button;