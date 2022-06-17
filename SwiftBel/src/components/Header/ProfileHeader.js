import React from 'react';
import {
    View, Text, Image, TouchableHighlight,
} from 'react-native';
import propTypes from 'prop-types';
import Styles from './Styles';
import { palette } from '../../theme';
const ProfileHeader = ({
    goBack = () => { },
    rightText = '',
    customStyle,
}) => {
    return (
        <View style={{...Styles.profileContainer,...customStyle}}>
            <Text style={{fontSize:18,fontWeight:'500',color:palette.black,fontFamily:"Roobert-Medium",margin:5}}>{rightText}</Text>
        </View>
    );
}
ProfileHeader.propTypes = {
    goBack: propTypes.func,
    onPressCenterContainer: propTypes.bool,
    onPressRightContainer: propTypes.func,
    centerText: propTypes.string,
    rightText: propTypes.string,
    hideBackButton: propTypes.bool,
    imageSource: propTypes.any,
    customStyle: propTypes.object,
};

export default ProfileHeader;