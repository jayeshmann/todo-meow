import React from 'react';
import { checkTodo, deleteTodo, useStateValue } from '../state';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [, dispatch] = useStateValue();

  const handleDelete = (todoID: number) => {
    dispatch(deleteTodo(todoID));
  };
  const handleCheck = (todoID: number) => {
    dispatch(checkTodo(todoID));
  };

  return (
    <li key={todo.id}>
      <button
        onClick={() => {
          handleCheck(todo.id);
        }}
      >
        {String(todo.completed)}
      </button>
      {todo.title}
      <button onClick={() => {}}>Edit</button>
      <button
        onClick={() => {
          handleDelete(todo.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};
