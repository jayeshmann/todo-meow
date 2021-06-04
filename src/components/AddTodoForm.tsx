import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useField } from '../hooks';
import { addTodo, useStateValue } from '../state';

interface AddTodoFormProps {
  todosLength: number;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ todosLength }) => {
  const todo = useField('text');

  const [, dispatch] = useStateValue();

  const handleTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTodo({ id: todosLength, title: todo.value }));
    todo.onReset();
  };
  return (
    <form onSubmit={handleTodoSubmit} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="What do you wanna do?"
        variant="outlined"
        {...todo}
      />
      <button type="submit" hidden>
        Add
      </button>
    </form>
  );
};
