import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';

import { SwitchButton, Text } from '@app/blueprints';

import { Icons, SVGIcons } from '@src/assets';
import { AppImage, BaseLayout, Icon, SvgIcon } from '@src/components';

import useTodoList from './useTodoList';
import DividerLine from '@src/components/DividerLine/DividerLine';
import Header from '@src/components/Header/Header';
import { scaled } from '@src/utils';

const TodoListScreen = () => {
  const {
    color,
    styles,
    navigation,
    todos,
    handleTodoStatus,
    handleTodoDelete,
    handleAddTodoNavigation,
  } = useTodoList();

  return (
    <BaseLayout>
      <Header
        rightIcon={Icons.ADD_ICONS}
        onRightPress={() => {
          handleAddTodoNavigation();
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={todos}
          renderItem={({ item: todo, index }) => {
            return (
              <View style={styles.todoCard} key={todo.id}>
                <View style={styles.row}>
                  <Text preset="h3" style={styles.todoText}>
                    {todo.title}
                  </Text>

                  {todo?.priority && (
                    <Text preset="h4">{todo?.priority.toUpperCase()}</Text>
                  )}
                </View>
                <Text preset="h4" style={styles.todoDescription}>
                  {todo.description}
                </Text>
                <Text preset="h5" style={styles.todoDescription}>
                  {todo.deadline ? new Date(todo.deadline).toDateString() : ''}
                </Text>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    onPress={() => handleTodoDelete(index)}
                    style={styles.button}>
                    <SvgIcon
                      icon={SVGIcons.DELETE}
                      pathFill={color.primaryColor}
                      {...scaled(20)}
                    />
                  </TouchableOpacity>

                  <SwitchButton
                    label="Completed"
                    onValueChange={value => {
                      handleTodoStatus(index, value);
                    }}
                    value={todo.isComplete}
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    </BaseLayout>
  );
};

export default React.memo(TodoListScreen);
