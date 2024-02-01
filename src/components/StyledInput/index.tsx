import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TextInputProps,
  Pressable,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: moderateScale(350),
    height: moderateScale(45),
    borderWidth: moderateScale(1),
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.margins.medium,
    borderRadius: theme.borderRadius.regular,
  },
  inputField: {
    left: theme.margins.medium,
    height: moderateScale(40),
    width: moderateScale(290),
  },
  errorText: {
    color: theme.colors.red,
    fontSize: theme.fontSizes.small,
    marginRight: theme.margins.small,
  },
  passIcon: {
    width: moderateScale(35),
    right: theme.margins.small,
    alignItems: 'center',
  },
});

interface Props {
  title: string;
  inputType: KeyboardTypeOptions;
  secureEntry?: boolean;
}

export default ({
  title,
  inputType,
  secureEntry = false,
  ...rest
}: Props & TextInputProps) => {
  const [showPass, setShowPass] = useState(true);
  return (
    <View style={styles.input}>
      <TextInput
        placeholder={title}
        style={styles.inputField}
        keyboardType={inputType}
        autoCapitalize="none"
        secureTextEntry={secureEntry && showPass}
        {...rest}
      />
      {secureEntry && (
        <Pressable
          onPress={() => setShowPass(!showPass)}
          style={styles.passIcon}>
          <Feather
            name={showPass ? 'eye' : 'eye-off'}
            size={moderateScale(24)}
            color={theme.colors.gray}
          />
        </Pressable>
      )}
    </View>
  );
};
