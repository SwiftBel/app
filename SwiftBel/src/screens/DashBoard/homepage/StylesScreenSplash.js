import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { palette } from '../../../theme';
const widthPixel =Dimensions.get('window').width;
 const heightPixel=Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: palette.white,
    flex: 1,
    justifyContent: 'center',
    flexDirection:'row',
    marginLeft:-20
    

  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  logoStyle: {
    height: 100,
    width: 100,
    marginRight:-20,

    
  },

  shape: {
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default styles;
