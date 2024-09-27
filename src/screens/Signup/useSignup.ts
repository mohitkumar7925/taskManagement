import { useCallback, useRef, useState } from 'react';
import { Alert, TextInput } from 'react-native';

import * as yup from 'yup';

import { useAppContext, useAuth } from '@src/context';
import { logger } from '@src/utils';

import { loginStyles } from './Signup.style';
import { Screen } from '../../navigation/appNavigation.type';

const useLogin = () => {
  const { color, navigation, loader } = useAppContext();
  const { user, register } = useAuth();
  const [disabled, setDisabled] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  const fieldValidation = yup.object().shape({
    email: yup.string().trim().required('Please enter your Email'),
    password: yup
      .string()
      .trim()
      .required('Please enter your Password')
      .length(6, 'Password should be at least 6 characters'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleButtonSubmit = useCallback(
    async (values: typeof initialValues) => {
      try {
        loader.current?.show();
        const { email, password } = values;
        logger('values: ', values);
        setDisabled(true);
        const response = await register(email, password);
        setDisabled(false);
        response &&
          navigation.reset({
            index: 0,
            routes: [{ name: Screen.TODO_LIST }],
          });
        loader.current?.hide();
      } catch (error) {
        loader.current?.hide();
        Alert.alert('Error', error?.toString() || 'Something went wrong');
      }
    },
    []
  );

  return {
    disabled,
    fieldValidation,
    handleButtonSubmit,
    initialValues,
    navigation,
    passwordRef,
    styles: loginStyles(color),
  };
};

export default useLogin;
