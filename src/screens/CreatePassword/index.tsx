import { Alert, Pressable } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { theme } from '../../theme';
import { StyledText, StyledInput } from '../../components';
import { FormData } from '../CreateUser';
import { CreateNewUser } from '../../API/types';
import { RegistrationParamList } from '../../navigation/Registration';
import { ROUTES } from '../../navigation/constants';
import { passwordRegExp } from '../../utils/helpers ';
import { useLanguage } from '../../hooks/useLanguage';
import {
  selectCreateUserErrorMessage,
  fetchCreateUser,
} from '../../redux/reducers/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
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
  passIcon: {
    position: 'absolute',
    width: moderateScale(35),
    bottom: moderateScale(415),
    right: theme.margins.medium,
    alignItems: 'center',
  },
  confirmPassIcon: {
    position: 'absolute',
    width: moderateScale(35),
    bottom: moderateScale(355),
    right: theme.margins.medium,
    alignItems: 'center',
  },
});

export default ({
  navigation,
  route,
}: StackScreenProps<RegistrationParamList, typeof ROUTES.CREATE_PASSWORD>) => {
  const { userInfo } = route.params;

  const validationSchema = yup.object({
    password: yup
      .string()
      .matches(
        passwordRegExp,
        '-password must be at least 8 characters long; \n- must contain at least one number or symbol;\n- must contain a mix of uppercase and lowercase letters.',
      )
      .required('Required'),
    confirmed_password: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) });

  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(selectCreateUserErrorMessage);
  const translations = useLanguage();

  const onSubmit: SubmitHandler<CreateNewUser> = data => {
    const userData = Object.assign(userInfo, data);
    dispatch(fetchCreateUser(userData));
    if (errorMessage === 'user with this email already exists.') {
      Alert.alert(translations.common.userExist, '', [
        {
          text: translations.common.yes,

          onPress: () => navigation.navigate(ROUTES.LOGIN),
        },
      ]);
    } else {
      Alert.alert(
        translations.common.createAccountMessage,
        translations.common.moveToLogin,
        [
          {
            text: translations.common.yes,
            onPress: () => navigation.navigate(ROUTES.LOGIN),
          },
        ],
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      extraHeight={moderateScale(180)}>
      {errors.password && (
        <StyledText style={styles.errorText}>
          {errors.password.message}
        </StyledText>
      )}
      {errors.confirmed_password && (
        <StyledText style={styles.errorText}>
          {errors.confirmed_password.message}
        </StyledText>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <StyledInput
            title={translations.common.enterPassword}
            inputType="visible-password"
            onChangeText={onChange}
            value={value}
            secureEntry={true}
          />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <StyledInput
            title={translations.common.confirmPassword}
            inputType="visible-password"
            onChangeText={onChange}
            value={value}
            secureEntry={true}
          />
        )}
        name="confirmed_password"
      />
      <Pressable style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
        <StyledText>{translations.common.createAccount}</StyledText>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};
