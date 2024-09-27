import React from 'react';
import { View } from 'react-native';

import { Button, Text, TextInput } from '@app/blueprints';
import { Formik } from 'formik';

import { BaseLayout } from '@src/components';
import { contents } from '@src/context';

import useSignup from './useSignup';
import { Screen } from '../../navigation/appNavigation.type';

const SignupScreen = () => {
  const {
    disabled,
    fieldValidation,
    handleButtonSubmit,
    initialValues,
    passwordRef,
    styles,
    navigation,
  } = useSignup();

  return (
    <BaseLayout>
      <View style={styles.header} />
      <View style={styles.content}>
        <Text preset="h1">{contents('login.sign_up')}</Text>
        <Formik
          validationSchema={fieldValidation}
          initialValues={initialValues}
          onSubmit={handleButtonSubmit}>
          {({ resetForm, submitForm }) => (
            <View style={styles.fieldContainer}>
              <TextInput
                label={contents('login.email')}
                variant="filled"
                name={'email'}
                placeholder={contents('login.yourEmailId')}
                style={styles.input}
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
              />
              <TextInput
                label={contents('login.password')}
                variant="filled"
                name={'password'}
                ref={passwordRef}
                placeholder={contents('login.password')}
                style={styles.input}
                onSubmitEditing={submitForm}
              />
              <Button
                title={contents('login.signup')}
                buttonContainerStyle={styles.loginBtn}
                onPress={submitForm}
                disabled={disabled}
              />
              <Button
                title={'Reset'}
                buttonContainerStyle={styles.loginBtn}
                onPress={() => {
                  resetForm();
                }}
              />
              <Button
                title={contents('login.login')}
                buttonContainerStyle={styles.signupBtn}
                onPress={() => {
                  navigation.navigate(Screen.LOGIN);
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </BaseLayout>
  );
};

export default React.memo(SignupScreen);
