import React from 'react';
import { Text, TextProps } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../theme';

const styles = ScaledSheet.create({
  text: {
    fontFamily: 'Helvetica',
    color: theme.colors.platinum,
    fontSize: theme.fontSizes.regular,
  },
});

export default ({ children, style }: React.PropsWithChildren<TextProps>) => {
  return (
    <Text allowFontScaling={false} style={[styles.text, style]}>
      {children}
    </Text>
  );
};
