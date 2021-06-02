import React, { useState } from 'react';
import { useField } from '../hooks';
import { checkTodo, deleteTodo, editTodo, useStateValue } from '../state';
import { Todo } from '../types';
// import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import { TextField } from '@material-ui/core';

/* interface Props {
  color: 'red' | 'blue';
}

const useButtonStyles = makeStyles({
  root: {
    background: (props: Props) =>
      props.color === 'red'
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: (props: Props) =>
      props.color === 'red'
        ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
        : '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 24,
    padding: '0 15px',
    margin: 4,
  },
}); */

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
          disableRipple
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
