import { moderateScale } from 'react-native-size-matters';

export default {
  colors: {
    black: '#000000',
    white: '#ffffff',
    charcoal: '#2f455c',
    turquoise: '#34f5c5',
    blueGreen: '#21d0c2',
    blue: '#1dccfe',
    platinum: '#e7e3e0',
    darkGray: '#a9a9a9',
    gray: '#a6a6a6',
    sapphireBlue: '#0f5f87',
    red: '#e33d3d',
    lightGreen: '#65a765',
    lightBlue: '#4499ff',
    lightGrey: '#d2d2d2',
  },
  fontSizes: {
    regular: moderateScale(14),
    small: moderateScale(12),
    large: moderateScale(16),
  },
  iconSizes: {
    tabIcon: moderateScale(30),
  },
  margins: {
    small: moderateScale(10),
    medium: moderateScale(15),
    large: moderateScale(20),
    space: 5,
  },
  paddings: {
    small: moderateScale(10),
    medium: moderateScale(15),
    large: moderateScale(20),
  },

  borderRadius: {
    regular: moderateScale(10),
    medium: moderateScale(15),
    large: moderateScale(20),
  },
};
