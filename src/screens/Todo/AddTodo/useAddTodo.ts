import { useAppContext, useAuth } from '@src/context';

import { AddTodoStyles } from './AddTodo.style';
import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { logger } from '@src/utils';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavStackParams, Screen } from '@src/navigation/appNavigation.type';
import { TodoService } from '@src/services/firebase/TodoService';
import { Alert } from 'react-native';

const useAddTodo = () => {
  const { color, navigation, loader } = useAppContext();
  const [disabled, setDisabled] = useState(false);
  const { user } = useAuth();
  const uid = user?.uid || '';
  const { params } = useRoute<RouteProp<NavStackParams, Screen.ADD_TODO>>();
  const { todos } = params;
  const fieldValidation = yup.object().shape({
    title: yup
      .string()
      .trim()
      .required('Please enter Todo title')
      .max(15, 'Max length is 15 characters'),
    // description: yup.string().trim().required('Please enter Todo description'),
  });

  const initialValues = {
    id: Math.round(Math.random() * 1000000),
    description: '',
    title: '',
    deadline: new Date().toString(),
    priority: 'low',
  };

  const handleButtonSubmit = useCallback(
    async (values: typeof initialValues) => {
      try {
        loader.current?.show();
        logger('values: ', values);
        setDisabled(true);
        await TodoService.handleChange(
          uid,
          todos.concat([{ ...values, isComplete: false }])
        );
        loader.current?.hide();
        navigation.goBack();
        setDisabled(false);
      } catch (error) {
        loader.current?.hide();
        Alert.alert('Error', error?.toString() || 'Something went wrong');
      }
    },
    []
  );

  return {
    navigation,
    styles: AddTodoStyles(color),
    fieldValidation,
    handleButtonSubmit,
    initialValues,
    disabled,
  };
};

export default useAddTodo;
