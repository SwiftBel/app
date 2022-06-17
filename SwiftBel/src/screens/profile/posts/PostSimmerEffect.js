import React from 'react';
import {
  View,
} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import styles from './PostStyle';
import { palette } from '../../theme';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'

 const PostLoader = () => {
    const emptyValues = Array.from(Array(10).keys(), (n) => n + 1);
    return(
        emptyValues.map((item) => (
    <View style={[styles.container]}>
    <ShimmerPlaceholder autoRun style={[styles.postImage]} LinearGradient={LinearGradient} />
    </View>
    ))
    
    )
    };
export default PostLoader