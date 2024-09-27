import React from 'react';
import { View } from 'react-native';

import { Button, DatePicker, Text, TextInput } from '@app/blueprints';
import useAddTodo from './useAddTodo';
import Header from '@src/components/Header/Header';
import { BaseLayout } from '@src/components';
import { Formik } from 'formik';
import { contents } from '@src/context';
import { AddTodoParams } from '@src/navigation/appNavigation.type';
import PrioritySelector from '@src/components/PrioritySelector/PrioritySelector';

const AddTodoScreen = () => {
  const {
    styles,
    fieldValidation,
    handleButtonSubmit,
    initialValues,
    disabled,
  } = useAddTodo();

  return (
    <BaseLayout>
      <Header title="todo.addTodo" />
      <View style={styles.content}>
        <Text preset="h1">{contents('todo.enterTodo')}</Text>
        <Formik
          validationSchema={fieldValidation}
          initialValues={initialValues}
          onSubmit={handleButtonSubmit}>
          {({ submitForm }) => (
            <View>
              <TextInput
                label={contents('todo.title')}
                variant="filled"
                name={'title'}
                placeholder={contents('todo.todoPlaceholder')}
                style={styles.input}
                onSubmitEditing={() => submitForm}
              />
              <TextInput
                label={contents('todo.description')}
                variant="filled"
                name={'description'}
                placeholder={contents('todo.todoDescPlaceholder')}
                style={styles.input}
                onSubmitEditing={() => submitForm}
              />
              <DatePicker name="dealline" minimumDate={new Date()} />
              <PrioritySelector name="priority" />
              <Button
                title={contents('common.add')}
                buttonContainerStyle={styles.loginBtn}
                onPress={submitForm}
                disabled={disabled}
              />
            </View>
          )}
        </Formik>
      </View>
    </BaseLayout>
  );
};

export default React.memo(AddTodoScreen);
