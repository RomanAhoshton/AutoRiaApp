import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../../theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: theme.colors.darkGray,
  },
});

const Rail = () => {
  return <View style={styles.root} />;
};

export default memo(Rail);
