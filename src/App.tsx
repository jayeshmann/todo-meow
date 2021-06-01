import React from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { useStateValue } from './state';

const App: React.FC = () => {
  const [{ todos }] = useStateValue();

  console.log(todos);
  return (
    <>
      <h1>Todo Meow</h1>
      <AddTodoForm todosLength={todos.length} />
      <br />
      <br />
      <br />
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </>
  );
};

export default App;
