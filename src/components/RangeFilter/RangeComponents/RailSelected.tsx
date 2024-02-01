import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../../theme';

const styles = StyleSheet.create({
  root: {
    height: moderateScale(4),
    backgroundColor: theme.colors.lightBlue,
    borderRadius: moderateScale(2),
  },
});
const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);
