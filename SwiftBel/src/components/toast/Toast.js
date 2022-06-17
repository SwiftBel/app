import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import React from 'react';
import {
  Text, View, Image, StyleSheet, Platform,
} from 'react-native';
import { palette } from '../../theme';
import { Caution, SwiftBel } from '../../assets';

export const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',

  BOTTOM_SUCCESS: 'bottom_success',
};

export const toastConfig = {
  [ToastType.BOTTOM_SUCCESS]: function bottomSuccess({ text2 }) {
    return (
      <View style={styles.toastViewStyle}>
        <Text style={styles.toastTextStyle}>{text2}</Text>
        <Image source={SwiftBel} style={styles.toastImageStyle} />
      </View>
    );
  },
  error:(props)=>(
    <BaseToast
    {...props}
    style={{borderLeftColor:palette.pink}}
    text2NumberOfLines={5}
    />
  )

};

// type : 'success | error | info'
// position : 'top | bottom'
export function applyToast(msg, type = 'success', position = 'top') {
  const header = getHeader(type);
  if (typeof msg !== 'string') return;
  if (msg.trim() === '') return;

  // eslint-disable-next-line object-shorthand
  Toast.show({
    type,
    position,
    text1: header,
    text2: msg,
    visibilityTime: 4000,
    autoHide: true
  });
}

export function getHeader(type) {
  switch (type) {
    case ToastType.SUCCESS:
      return 'Success';
    case ToastType.ERROR:
      return 'Error';
    case ToastType.INFO:
      return 'Info';
    case ToastType.BOTTOM_SUCCESS:
      return ToastType.BOTTOM_SUCCESS;
    default:
      return '!!!';
  }
}

const bottomToastBackground = Platform.OS === 'ios' ? 'rgba(213, 245, 233, 0.8)' : `rgba( 0, 171, 107, 0.08)`;

const styles = StyleSheet.create({
  toastViewStyle: {
    height: 48,
    width: 335,
    backgroundColor: bottomToastBackground,
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowColor: `rgba( 0, 171, 107, 0.08)`,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toastTextStyle: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'normal',
   // fontFamily: fontFamily.InterMedium,
    letterSpacing: 0,
    marginLeft: 16,
    color: palette.grey,
    marginTop: 16,
  },
  toastImageStyle: {
    height: 25,
    width: 25,
    opacity: 1,
    marginRight: 16,
    marginTop: 16,
  },
});