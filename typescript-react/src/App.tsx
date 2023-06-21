import React, { useState } from "react";

import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";

import { Todo } from "./components/Todo.model";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos((state) => {
      return [...state, { id: Math.random().toString(), text: text }];
    });
  };

  const deleteHandler = (todoId: string) => {
    setTodos((state) => {
      return state.filter((todo) => todo.id !== todoId);
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDelete={deleteHandler} />
    </div>
  );
};

export default App;
