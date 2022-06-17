import { StyleSheet } from 'react-native';
import { palette } from '../../theme';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
    } from '../../utils/Responsive/index'

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
   // fontFamily: fontFamily.InterBold,
    color: palette.grey,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
  },
  boxView: {
    marginHorizontal: wp(16),
    marginTop: hp(16),
  },
  date: {
    fontSize: 12,
    //fontFamily: fontFamily.Regular,
    color: 'rgba(32, 32, 32, 0.5)',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
    marginBottom: hp(16),
  },
  lineView: {
    borderBottomWidth: 1,
    borderBottomColor: palette.black,
    height: 1,
  },
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dotView: {
    width: wp(8),
    height: wp(8),
    backgroundColor: palette.blue,
    borderRadius: 5,
    marginTop: hp(16),
  },
  tabView: {
    height: wp(32),
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    marginRight: 10,
    paddingHorizontal: wp(17),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: palette.pink,
  },
  activeTabView: {
    borderRadius: 16,
    backgroundColor: palette.pink,
  },
  inActiveTabView: {
    borderRadius: 16,
    backgroundColor: '#ecf4f5',
  },
  activeTabName: {
    fontSize: 17,
   // fontFamily: fontFamily.Bold,
    lineHeight: 16,
    color: palette.grey,
  },
  inActiveTabName: {
    fontSize: 17,
   // fontFamily: fontFamily.InterRegular,
    lineHeight: 16,
    color: palette.pink,
  },
  tabScrollView: {
    paddingHorizontal: wp(20),
    paddingVertical: hp(20),
    alignItems: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
  },
  flexContainer: {
    flex: 1,
  },
});

export default styles;