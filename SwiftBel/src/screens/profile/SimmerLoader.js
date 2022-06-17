import React from 'react';
import {
  View,
} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Style';
import { palette } from '../../theme';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'

export const AvatarLoader = () => (
  <View style={[styles.profileContainer]}>
    <ShimmerPlaceholder autoRun style={[styles.profileImage,{height:Platform.OS==='ios'?hp('12%'): hp('13%'),marginTop:5}]} LinearGradient={LinearGradient} />
  </View>
);
export const BannerLoader = () => (
    <View style={[styles.bannerContainer]}>
      <ShimmerPlaceholder autoRun style={styles.bannerImage_Style} LinearGradient={LinearGradient} />
    </View>
  );

// export default AvatarLoader
