import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../../theme';

const THUMB_RADIUS = 15;

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: moderateScale(1),
    borderColor: theme.colors.white,
    backgroundColor: theme.colors.lightBlue,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
  },
});
const Thumb = () => <View style={styles.root} />;

export default memo(Thumb);
