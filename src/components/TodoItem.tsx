import React, { useState } from 'react';
import { useField } from '../hooks';
import { checkTodo, deleteTodo, editTodo, useStateValue } from '../state';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [, dispatch] = useStateValue();

  const [editMode, setEditMode] = useState(false);
  const newTodo = useField('text', todo.title);

  const handleDelete = (todoID: number) => {
    dispatch(deleteTodo(todoID));
  };
  const handleCheck = (todoID: number) => {
    dispatch(checkTodo(todoID));
  };
  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(newTodo);
    dispatch(
      editTodo({ id: todo.id, title: newTodo.value, completed: todo.completed })
    );
    newTodo.onReset();
    setEditMode(false);
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

      {editMode ? (
        <>
          <form onSubmit={handleEdit}>
            <input {...newTodo} />
            <button type="submit" hidden></button>
          </form>
          <button
            onClick={() => {
              setEditMode(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          {todo.title}
          <button
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit
          </button>
        </>
      )}
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
