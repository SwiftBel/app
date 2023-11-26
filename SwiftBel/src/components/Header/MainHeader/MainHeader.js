import React from 'react';
import {
    View, Text, Image, TouchableHighlight, TouchableOpacity,
} from 'react-native';
import propTypes from 'prop-types';
import Styles from './Style';
import style from '../Styles'
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
    leftImage=null,
    leftIconStyle={},
    onRightClick=()=>{},
    containerStyle={},
    rightStyle={},
    centerTextStyle={},
    leftImageContainer={}

}) => {

  
    const renderLeftContainer = () => (
        <View style={style.backArrow}>
          <TouchableOpacity
            onPress={onleftClick}
            underlayColor={palette.lightGrey}
          >
            {!imageSource ? (
              <Image
                style={style.backImage}
                source={Back}
              />
            )
              : (
                  <View style={leftImageContainer}>
                <Image
                  style={[style.backImage,leftIconStyle]}
                  source={{uri:imageSource}}
                />
                </View>
              )}
    
          </TouchableOpacity>
        </View>
      );

    const renderCenterContainer = () => (
        <TouchableHighlight
          underlayColor="none"
          style={style.subContainer}
        //  onPress={onPressCenterContainer}
        >
          <Text numberOfLines={1} style={[style.centerText]}>{centerText}</Text>
        </TouchableHighlight>
      );

      const renderRightContainer = () => (
        <TouchableOpacity style={style.rightView} onPress={()=>onRightClick()}>
        <Image
        source={RightImage}
        style={[Styles.RightImage,rightStyle]}
        />
        </TouchableOpacity>
      );
      const renderRightText = () => (
        <TouchableOpacity  style={style.rightView} onPress={()=>onRightClick()}>
        <Text style={{fontSize:18,fontWeight:'500',color:palette.black,fontFamily:"Roobert-Medium",...rightStyle}}>{rightText}</Text>
        </TouchableOpacity>
      );
    return (
        <View style={{...Styles.mainContainer,containerStyle}}>
            <View style={[style.containerView,containerStyle]}>
         {leftText||leftImage? renderLeftContainer():null}
         { renderCenterContainer()}
         {RightImage? renderRightContainer():null}
         {rightText?renderRightText():null}
         </View>
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
    leftImage:propTypes.any,
    leftIconStyle:propTypes.object,
    hideBackButton: propTypes.bool,
    imageSource: propTypes.any,
    customStyle: propTypes.object,
    leftText:propTypes.string,
    RightImage:propTypes.any,
    containerStyle: propTypes.object,
    rightStyle:propTypes.object,
    centerTextStyle:propTypes.object,
    leftImageContainer:propTypes.object
};

export default MainHeader;