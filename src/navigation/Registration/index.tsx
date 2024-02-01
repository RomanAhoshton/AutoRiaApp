import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateUser, CreatePassword } from '../../screens';
import { ROUTES } from '../constants';
import { CreateNewUser } from '../../API/types';

export type RegistrationParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.CREATE_USER]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.CREATE_PASSWORD]: { userInfo: CreateNewUser };
};

const Stack = createStackNavigator<RegistrationParamList>();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.CREATE_USER} component={CreateUser} />
      <Stack.Screen name={ROUTES.CREATE_PASSWORD} component={CreatePassword} />
    </Stack.Navigator>
  );
};
