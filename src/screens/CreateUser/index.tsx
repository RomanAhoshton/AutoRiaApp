import React from 'react';
import { Pressable } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../../theme';
import { StyledText, StyledInput } from '../../components';
import { RegistrationParamList } from '../../navigation/Registration';
import { ROUTES } from '../../navigation/constants';
import { CreateNewUser } from '../../API/types';
import { phoneRegExp, emailRegExp } from '../../utils/helpers ';
import { useLanguage } from '../../hooks/useLanguage';

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
  errorText: {
    color: theme.colors.red,
    fontSize: theme.fontSizes.small,
    marginRight: theme.margins.small,
  },
  backToLogin: {
    marginTop: theme.margins.small,
  },
});

export type FormData = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  confirmed_password: string;
};

export default () => {
  const translations = useLanguage();
  const navigation = useNavigation<NavigationProp<RegistrationParamList>>();

  const validationSchema = yup.object({
    first_name: yup.string().required('Required'),
    last_name: yup.string().required('Required'),
    phone_number: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Required'),
    email: yup
      .string()
      .matches(emailRegExp, 'Please enter valid email address')
      .required('Required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<CreateNewUser> = async (
    data: CreateNewUser,
  ) => {
    navigation.navigate(ROUTES.CREATE_PASSWORD, { userInfo: data });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      extraHeight={moderateScale(180)}>
      {errors.first_name && (
        <StyledText style={styles.errorText}>
          {errors.first_name.message}
        </StyledText>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <StyledInput
            title={translations.common.firstName}
            inputType="default"
            onChangeText={onChange}
            value={value}
            secureEntry={false}
          />
        )}
        name="first_name"
      />
      {errors.last_name && (
        <StyledText style={styles.errorText}>
          {errors.last_name.message}
        </StyledText>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <StyledInput
            title={translations.common.lastName}
            inputType="default"
            onChangeText={onChange}
            value={value}
            secureEntry={false}
          />
        )}
        name="last_name"
      />
      {errors.email && (
        <StyledText style={styles.errorText}>{errors.email.message}</StyledText>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <StyledInput
            title={translations.common.email}
            inputType="email-address"
            onChangeText={onChange}
            value={value}
            secureEntry={false}
          />
        )}
        name="email"
      />
      {errors.phone_number && (
        <StyledText style={styles.errorText}>
          {errors.phone_number.message}
        </StyledText>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <StyledInput
            title={translations.common.phoneNumber}
            inputType="name-phone-pad"
            onChangeText={onChange}
            value={value}
            secureEntry={false}
          />
        )}
        name="phone_number"
      />
      <Pressable style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
        <StyledText>{translations.common.continue}</StyledText>
      </Pressable>

      <Pressable
        style={styles.backToLogin}
        onPress={() => navigation.navigate(ROUTES.LOGIN)}>
        <StyledText>{translations.common.backToLoginPage}</StyledText>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};
