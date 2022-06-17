import React from 'react';
import {
    Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';


const ButtonWithImage = ({
    onClick,
    ButtonStyle,
    imageStyle,
    imageSource,
    buttonTextStyle,
    ButtonText = '',
    ButtonLeftText='',
    buttonLeftTextStyle,
    keys
}) => (
    <TouchableOpacity key={keys} style={ButtonStyle} onPress={onClick} ß>

        {(ButtonText) ? <Text style={buttonTextStyle}>{ButtonText}</Text> : null}

        <Image resizeMode="contain" style={imageStyle} source={imageSource} />
        {(ButtonLeftText) ? <Text style={buttonLeftTextStyle}>{ButtonLeftText}</Text> : null}
    </TouchableOpacity>

);

ButtonWithImage.propTypes = {
    onClick: PropTypes.func,
    ButtonText: PropTypes.string,
    ButtonLeftText:PropTypes.string,
    ButtonStyle: PropTypes.any,
    buttonTextStyle: PropTypes.any,
    buttonLeftTextStyle:PropTypes.any,
    imageStyle: PropTypes.any,
    imageSource: PropTypes.any,
    keys:PropTypes.any
};
export default ButtonWithImage