import { Alert, Pressable } from 'react-native/';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';
import { StyledText } from '../../components';

import { logoutUser } from '../../redux/reducers/AuthSlice';
import { useAppDispatch } from '../../redux/hooks';
import { theme } from '../../theme';
import { useLanguage } from '../../hooks/useLanguage';
import { AuthenticatedParamList } from '../../navigation/TabNavigation';

const styles = ScaledSheet.create({
  buttonText: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.turquoise,
  },
});

export default () => {
  const translations = useLanguage();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<AuthenticatedParamList>>();

  const logOut = () => {
    Alert.alert(translations.common.logoutAlert, '', [
      {
        text: translations.common.no,
      },
      {
        text: translations.common.yes,
        onPress: () => {
          dispatch(logoutUser());
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <Pressable onPress={logOut}>
      <StyledText style={styles.buttonText}>
        {translations.common.logoutText}
      </StyledText>
    </Pressable>
  );
};
