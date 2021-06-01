import React from 'react';
import { useField } from '../hooks';
import { addTodo, useStateValue } from '../state';

interface AddTodoFormProps {
  todosLength: number;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ todosLength }) => {
  const todo = useField('text', 'What do you wanna do?');

  const [, dispatch] = useStateValue();

  const handleTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTodo({ id: todosLength, title: todo.value }));
    todo.onReset();
  };
  return (
    <form onSubmit={handleTodoSubmit}>
      <input {...todo} />
      <button type="submit" hidden></button>
    </form>
  );
};
