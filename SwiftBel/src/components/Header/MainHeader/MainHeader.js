import React from 'react';
import {
    View, Text, Image, TouchableHighlight, TouchableOpacity,
} from 'react-native';
import propTypes from 'prop-types';
import Styles from './Style';
import { palette } from '../../../theme';
import { ButtonWithIcon } from '../..';
import { Back, Etc } from '../../../assets';
const MainHeader = ({
    onleftClick = () => { },
    rightText = '',
    customStyle,
    imageSource=null,
    leftText='',
    RightImage=null,
    centerText='',
    onRightClick=()=>{}

}) => {

    const renderLeftContainer = () => (
        <ButtonWithIcon
        ButtonLeftText={leftText}
        buttonLeftTextStyle={Styles.backText}
        ButtonStyle={Styles.backArrow}
        onClick={() => onleftClick()} />
    );

    const renderCenterContainer = () => (
        <View style={{ 
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'}}>
        <Text style={{fontSize:18,fontWeight:'500',color:palette.black,fontFamily:"Roobert-Medium"}}>{centerText}</Text>
        </View>
      );

      const renderRightContainer = () => (
        <TouchableOpacity style={{flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',marginRight:25}} onPress={()=>onRightClick()}>
        <Image
        source={RightImage}
        style={Styles.RightImage}
        />
        </TouchableOpacity>
      );
      const renderRightText = () => (
        <TouchableOpacity style={{flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',marginRight:25}} onPress={()=>onRightClick()}>
        <Text style={{fontSize:18,fontWeight:'500',color:palette.black,fontFamily:"Roobert-Medium"}}>{rightText}</Text>
        </TouchableOpacity>
      );
    return (
        <View style={{...customStyle,justifyContent:'space-between',flexDirection:'row'}}>
         {leftText? renderLeftContainer():null}
         {centerText? renderCenterContainer():null}
         {RightImage? renderRightContainer():null}
         {rightText?renderRightText():null}
        </View>
    );
}
MainHeader.propTypes = {
    onleftClick: propTypes.func,
    onRightClick:propTypes.func,
    onPressCenterContainer: propTypes.bool,
    onPressRightContainer: propTypes.func,
    centerText: propTypes.string,
    rightText: propTypes.string,
    hideBackButton: propTypes.bool,
    imageSource: propTypes.any,
    customStyle: propTypes.object,
    leftText:propTypes.string,
    RightImage:propTypes.any
};

export default MainHeader;