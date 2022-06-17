import React from 'react';
import {
    Text, View, Image, TouchableOpacity, ActivityIndicator, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { palette } from '../../theme';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'


const ButtonWithImageIndicator = ({
    onClick,
    ButtonStyle,
    imageStyle,
    imageSource,
    buttonTextStyle,
    ButtonText = '',
    ButtonLeftText='',
    buttonLeftTextStyle,
    keys,
    indicator
}) => (
    <View>
     {
            indicator ?
                (
                    <View style={[style.indicatorStyle,ButtonStyle]}>
                        <ActivityIndicator size='small' color={palette.grey} animating={indicator} />
                        <Text style={{color:palette.grey,marginLeft:20}}>Loading...</Text>
                    </View>
                ) : (   
    <TouchableOpacity key={keys} style={ButtonStyle} onPress={onClick} ß>

        {(ButtonText) ? <Text style={buttonTextStyle}>{ButtonText}</Text> : null}

        <Image resizeMode="contain" style={imageStyle} source={imageSource} />
        {(ButtonLeftText) ? <Text style={buttonLeftTextStyle}>{ButtonLeftText}</Text> : null}
    </TouchableOpacity>)
    
    }
    </View>
);

ButtonWithImageIndicator.propTypes = {
    onClick: PropTypes.func,
    ButtonText: PropTypes.string,
    ButtonLeftText:PropTypes.string,
    ButtonStyle: PropTypes.any,
    buttonTextStyle: PropTypes.any,
    buttonLeftTextStyle:PropTypes.any,
    imageStyle: PropTypes.any,
    imageSource: PropTypes.any,
    keys:PropTypes.any,
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
export default ButtonWithImageIndicator