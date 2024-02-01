import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../../screens';
import { ROUTES, STACKS } from '../constants';
import RegistrationStack from '../Registration';
import { useLanguage } from '../../hooks/useLanguage';

export type UnauthenticatedParamList = {
  [ROUTES.LOGIN]: undefined;
  [STACKS.REGISTRATION_STACK]: undefined;
};

const Stack = createStackNavigator<UnauthenticatedParamList>();

export default () => {
  const translations = useLanguage();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ title: translations.common.login }}
      />
      <Stack.Screen
        name={STACKS.REGISTRATION_STACK}
        component={RegistrationStack}
        options={{
          headerLeftLabelVisible: false,
          headerShown: false,
          title: translations.common.registration,
        }}
      />
    </Stack.Navigator>
  );
};
