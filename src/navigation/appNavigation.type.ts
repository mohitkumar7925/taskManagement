import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NewsResult } from '@src/services';
import { TodoService } from '@src/services/firebase/TodoService';
import { TodoItem } from '@src/store';

export enum Screen {
  FORCE_UPDATE_SCREEN = 'FORCE_UPDATE_SCREEN',
  NETWORK_CHECK = 'NETWORK_CHECK',
  TODO_LIST = 'TODO_LIST',
  ADD_TODO = 'ADD_TODO',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

export type NavStackParams = {
  [Screen.FORCE_UPDATE_SCREEN]: undefined;
  [Screen.NETWORK_CHECK]: undefined;
  [Screen.TODO_LIST]: undefined;
  [Screen.ADD_TODO]: AddTodoParams;
  [Screen.LOGIN]: undefined;
  [Screen.SIGNUP]: undefined;
};

export type AddTodoParams = {
  todos: TodoItem[];
};
export type NewsDetailParams = {
  item: NewsResult;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;
