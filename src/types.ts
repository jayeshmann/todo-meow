export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type NewTodo = Omit<Todo, 'completed'>;
