import React from 'react';

import { NavigationContainerRef } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import {
  AddTodoScreen,
  LoginScreen,
  NetworkLoggerScreen,
  SignupScreen,
  TodoListScreen,
} from '@src/screens';

import { NavStackParams, Screen } from './appNavigation.type';
import { useAuth } from '@src/context';

export const navigationRef =
  React.createRef<NavigationContainerRef<NavStackParams>>();

const Stack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
};

export const AppNavigation = () => {
  const { user } = useAuth();
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions}>
        {user ? (
          <>
            <Stack.Screen name={Screen.TODO_LIST} component={TodoListScreen} />
            <Stack.Screen name={Screen.ADD_TODO} component={AddTodoScreen} />
            {__DEV__ && (
              <Stack.Screen
                name={Screen.NETWORK_CHECK}
                component={NetworkLoggerScreen}
              />
            )}
          </>
        ) : (
          <>
            <Stack.Screen name={Screen.LOGIN} component={LoginScreen} />
            <Stack.Screen name={Screen.SIGNUP} component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};
