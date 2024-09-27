import { useCallback, useEffect, useMemo, useState } from 'react';

import { contents, useAppContext, useAuth } from '@src/context';
import { NewsResult } from '@src/services';
import { logger } from '@src/utils';

import { todoListStyles } from './TodoList.style';
import { Screen } from '../../../navigation/appNavigation.type';
import { TodoService } from '@src/services/firebase/TodoService';
import { setTodos, TodoItem, todosData } from '@src/store';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';

const useTodoList = () => {
  const { color, loader, navigation, services } = useAppContext();

  const { user } = useAuth();
  const uid = user?.uid || '';

  // const [todos, setTodos] = useState<TodoItem[]>();

  const todos = useSelector(todosData);
  const dispatch = useDispatch();
  const handleNavigationNetwork = useCallback(() => {
    navigation.navigate(Screen.NETWORK_CHECK);
  }, [navigation]);

  const handleAddTodoNavigation = () => {
    navigation.navigate(Screen.ADD_TODO, {
      todos: todos || [],
    });
  };

  const handleTodoStatus = async (_todoIndex: number, isComplete: boolean) => {
    try {
      loader.current?.show();
      let newData = todos?.map((todo, index) => {
        if (index === _todoIndex) {
          return {
            ...todo,
            isComplete,
          };
        }
        return todo;
      });

      dispatch(setTodos(newData));
      await TodoService.handleChange(uid, newData || []);
      loader.current?.hide();
    } catch (error) {
      loader.current?.hide();
      Alert.alert('Error', error?.toString() || 'Something went wrong');
    }
  };

  const handleTodoDelete = async (_todoIndex: number) => {
    try {
      loader.current?.show();
      const newData = todos?.filter((todo, index) => index !== _todoIndex);
      await TodoService.handleChange(uid, newData || []);
      dispatch(setTodos(newData));
      loader.current?.hide();
    } catch (error) {
      loader.current?.hide();
      Alert.alert('Error', error?.toString() || 'Something went wrong');
    }
  };

  useEffect(() => {
    const unsub = TodoService.subscribe(uid, (_error, _todoData) => {
      if (_error) {
        logger(_error);
        Alert.alert('Error', _error?.message || 'Something went wrong');
      }
      logger(_todoData);
      dispatch(setTodos(_todoData));
    });
    return () => unsub?.();
  }, [uid]);

  const handleSetting = useCallback(() => {
    // navigation.navigate(Screen.SETTING);
  }, [navigation]);

  return {
    color,
    contents,
    todos,
    navigation,
    handleNavigationNetwork,
    handleAddTodoNavigation,
    handleSetting,
    styles: todoListStyles(color),
    handleTodoStatus,
    handleTodoDelete,
  };
};

export default useTodoList;
