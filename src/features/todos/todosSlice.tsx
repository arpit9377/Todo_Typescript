import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  text: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: []
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({ text: action.payload, completed: false });
    },
    editTodo: (state, action: PayloadAction<{ index: number; text: string }>) => {
      state.todos[action.payload.index].text = action.payload.text;
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      state.todos[action.payload].completed = true;
    },
  },
});

export const { addTodo, editTodo, completeTodo } = todosSlice.actions;
export const selectTodos = (state: { todos: TodosState }) => state.todos.todos;

export default todosSlice.reducer;
