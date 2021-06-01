import { State } from './state';
import { NewTodo, Todo } from '../types';

export type Action =
  | {
      type: 'ADD_TODO';
      payload: Todo;
    }
  | {
      type: 'DELETE_TODO';
      payload: number;
    }
  | {
      type: 'EDIT_TODO';
      payload: Todo;
    }
  | {
      type: 'CHECK_TODO';
      payload: number;
    };

export const addTodo = (todo: NewTodo): Action => {
  return { type: 'ADD_TODO', payload: { ...todo, completed: false } };
};
export const editTodo = (todo: Todo): Action => {
  return { type: 'EDIT_TODO', payload: todo };
};
export const deleteTodo = (todoID: number): Action => {
  return { type: 'DELETE_TODO', payload: todoID };
};
export const checkTodo = (todoID: number): Action => {
  return { type: 'CHECK_TODO', payload: todoID };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload)],
      };
    case 'CHECK_TODO':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.id === action.payload) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          }),
        ],
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) => {
            if (todo.id === action.payload.id) {
              return action.payload;
            }
            return todo;
          }),
        ],
      };
    default:
      return state;
  }
};
