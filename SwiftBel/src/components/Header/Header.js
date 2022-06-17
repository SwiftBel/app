import React from 'react';
import {
    View, Text, Image, TouchableHighlight,
} from 'react-native';
import propTypes from 'prop-types';
import Styles from './Styles';
import { Back } from '../../assets/index';
import { ButtonWithIcon } from '../../components/index'
const Header = ({
    goBack = () => { },
    onPressCenterContainer = () => { },
    onPressRightContainer = () => { },
    centerText = '',
    rightText = '',
    hideBackButton = false,
    imageSource = null,
    customStyle = {},
}) => {
    const renderLeftContainer = () => (
        <ButtonWithIcon
            ButtonLeftText={'Back'}
            buttonLeftTextStyle={Styles.backText}
            ButtonStyle={Styles.backArrow}
            imageStyle={Styles.backImage}
            imageSource={imageSource ? imageSource : Back}
            onClick={() => goBack()} />
    );

    // const renderCenterContainer = () => (
    //     <TouchableHighlight
    //       underlayColor="none"
    //       style={Styles.subContainer}
    //       onPress={onPressCenterContainer}
    //     >
    //       <Text numberOfLines={1} style={[Styles.centerText, customStyle]}>{centerText}</Text>
    //     </TouchableHighlight>
    //   );

    //   const renderRightContainer = () => (
    //     <View style={Styles.rightView}>
    //       <Touchable
    //         underlayColor={fontColor.lightestGrey}
    //         onPress={onPressRightContainer}
    //       >
    //         <Text numberOfLines={1} style={Styles.rightText}>{rightText}</Text>
    //       </Touchable>
    //     </View>
    //   );

    return (
        <View style={Styles.container}>
            {renderLeftContainer()}
            {/* {centerText ? renderCenterContainer() : <View style={Styles.subContainer} />}
            {rightText ? renderRightContainer() : <View style={Styles.subContainer} />} */}
        </View>
    );
}
Header.propTypes = {
    goBack: propTypes.func,
    onPressCenterContainer: propTypes.bool,
    onPressRightContainer: propTypes.func,
    centerText: propTypes.string,
    rightText: propTypes.string,
    hideBackButton: propTypes.bool,
    imageSource: propTypes.any,
    customStyle: propTypes.object,
};

export default Header;