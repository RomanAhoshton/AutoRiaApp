import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { StyledText } from '../../components';
import { MyAccount, Sales, Home } from '../../screens';
import { theme } from '../../theme';
import { ROUTES } from '../constants';
import { useLanguage } from '../../hooks/useLanguage';
import { useAppSelector } from '../../redux/hooks';
import { selectToken } from '../../redux/reducers/AuthSlice';
import AuthStack from '../AuthStack';

export type AuthenticatedParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SALES]: undefined;
  [ROUTES.MY_ACCOUNT]: undefined;
};

const styles = ScaledSheet.create({
  navigationIcon: {
    marginTop: theme.margins.small,
  },
});

const Tab = createBottomTabNavigator<AuthenticatedParamList>();

export default () => {
  const translations = useLanguage();
  const token = useAppSelector(selectToken);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: moderateScale(90),
        },
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <StyledText
              style={{
                color: focused
                  ? theme.colors.sapphireBlue
                  : theme.colors.darkGray,
                fontSize: theme.fontSizes.small,
              }}>
              {translations.common.home}
            </StyledText>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={theme.iconSizes.tabIcon}
              color={
                focused ? theme.colors.sapphireBlue : theme.colors.darkGray
              }
              style={styles.navigationIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SALES}
        component={token ? Sales : AuthStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <StyledText
              style={{
                color: focused
                  ? theme.colors.sapphireBlue
                  : theme.colors.darkGray,
                fontSize: theme.fontSizes.small,
              }}>
              {translations.common.sales}
            </StyledText>
          ),

          tabBarIcon: ({ focused }) => (
            <Feather
              name="plus-square"
              size={theme.iconSizes.tabIcon}
              color={
                focused ? theme.colors.sapphireBlue : theme.colors.darkGray
              }
              style={styles.navigationIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MY_ACCOUNT}
        component={token ? MyAccount : AuthStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <StyledText
              style={{
                color: focused
                  ? theme.colors.sapphireBlue
                  : theme.colors.darkGray,
                fontSize: theme.fontSizes.small,
              }}>
              {translations.common.myAccount}
            </StyledText>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="account-circle"
              color={
                focused ? theme.colors.sapphireBlue : theme.colors.darkGray
              }
              size={theme.iconSizes.tabIcon}
              style={styles.navigationIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
