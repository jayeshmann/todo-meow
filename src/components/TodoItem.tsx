import React, { useState } from 'react';
import { useField } from '../hooks';
import { checkTodo, deleteTodo, editTodo, useStateValue } from '../state';
import { Todo } from '../types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import TextField from '@material-ui/core/TextField';

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
    if (editMode === false) {
      dispatch(checkTodo(todoID));
    }
  };
  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      editTodo({ id: todo.id, title: newTodo.value, completed: todo.completed })
    );
    newTodo.onReset();
    setEditMode(false);
  };

  return (
    <ListItem key={todo.id} role={undefined} dense button divider>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          tabIndex={todo.id}
          inputProps={{ 'aria-labelledby': `checkbox-list-label-${todo.id}` }}
          onClick={() => {
            handleCheck(todo.id);
          }}
        />
      </ListItemIcon>
      {editMode ? (
        <>
          <form onSubmit={handleEdit} noValidate autoComplete="off">
            <TextField
              id={`filled-basic-${todo.id}`}
              {...newTodo}
              size="small"
              fullWidth
            />
            <button type="submit" hidden></button>
          </form>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => {
              setEditMode(false);
            }}
          >
            <CancelTwoToneIcon />
          </IconButton>
        </>
      ) : (
        <>
          {todo.completed ? (
            <s>
              <ListItemText id={`list-item-${todo.id}`} primary={todo.title} />
            </s>
          ) : (
            <>
              <ListItemText id={`list-item-${todo.id}`} primary={todo.title} />
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                <EditTwoToneIcon />
              </IconButton>
            </>
          )}
        </>
      )}

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          color="secondary"
          onClick={() => {
            handleDelete(todo.id);
          }}
        >
          <DeleteOutlineTwoToneIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
