import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TodoItem = {
  id: number;
  title: string;
  description?: string;
  deadline: string;
  priority: string;
  isComplete: boolean;
};

type AppData = {
  todoList: TodoItem[];
};

const initialState: AppData = {
  todoList: [],
};

export const todoSlice = createSlice({
  initialState,
  name: 'todoData',
  reducers: {
    resetTodoData: () => initialState,
    setTodos: (state, { payload }: PayloadAction<TodoItem[] | []>) => {
      state.todoList = payload;
    },
  },
});

export const {
  actions: { resetTodoData, setTodos },
  name: todoDataName,
  reducer: todoData,
} = todoSlice;
