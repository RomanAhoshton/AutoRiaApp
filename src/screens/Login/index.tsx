import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../theme';
import { StyledText } from '../../components';
import { UserLogin } from '../../API/types';
import { STACKS } from '../../navigation/constants';
import { UnauthenticatedParamList } from '../../navigation/AuthStack';
import { useLanguage } from '../../hooks/useLanguage';
import {
  fetchLoginUser,
  selectAuthLoginQueryStatuses,
} from '../../redux/reducers/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },
  inputs: {
    width: moderateScale(300),
    height: moderateScale(45),
    borderWidth: moderateScale(1),
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.margins.medium,
    borderRadius: theme.borderRadius.regular,
    flexDirection: 'row',
  },
  inputField: {
    left: theme.margins.medium,
    height: moderateScale(40),
    width: moderateScale(200),
  },
  submitBtn: {
    width: moderateScale(200),
    backgroundColor: theme.colors.blueGreen,
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.margins.large,
    borderRadius: theme.borderRadius.regular,
  },
  buttonTitle: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.regular,
  },
  redirectToRegistrationText: {
    flexDirection: 'row',
    marginTop: theme.margins.small,
  },
});

export default () => {
  const navigation = useNavigation<NavigationProp<UnauthenticatedParamList>>();

  const translations = useLanguage();

  const initialUserState: UserLogin = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialUserState);
  const dispatch = useAppDispatch();

  const [showPass, setShowPass] = useState(true);

  const loading = useAppSelector(selectAuthLoginQueryStatuses);

  const loginToAccountHandler = async () => {
    dispatch(fetchLoginUser(user));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <TextInput
          style={styles.inputField}
          value={user.email}
          onChangeText={value => setUser({ ...user, email: value })}
          placeholder={translations.common.enterName}
        />
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.inputField}
          value={user.password}
          onChangeText={value => setUser({ ...user, password: value })}
          placeholder={translations.common.enterPassword}
          secureTextEntry={showPass}
        />
        <Pressable
          onPress={() => setShowPass(!showPass)}
          style={{ marginRight: theme.borderRadius.regular }}>
          <Feather
            name={showPass ? 'eye' : 'eye-off'}
            size={moderateScale(24)}
            color={theme.colors.gray}
          />
        </Pressable>
      </View>
      {loading && (
        <ActivityIndicator
          size={theme.fontSizes.large}
          color={theme.colors.darkGray}
        />
      )}

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={loginToAccountHandler}>
        <StyledText>{translations.common.loginButton}</StyledText>
      </TouchableOpacity>
      <View style={styles.redirectToRegistrationText}>
        <StyledText style={{ marginRight: theme.margins.space }}>
          {translations.common.or}
        </StyledText>
        <TouchableOpacity
          onPress={() => navigation.navigate(STACKS.REGISTRATION_STACK)}>
          <StyledText>{translations.common.createNewAccount}</StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
