import React from "react";

import "./TodoList.css";

interface TodoListProps {
  items: { id: string; text: string }[]; //An array of objects where the id is a string and the text is a string
  onDelete: (todoId: string) => void;
}

const TodoList: React.FunctionComponent<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          {/* below, i could've done the function syntax so it would be onClick={() => props.onDelete(todo.id)} but i just learned that you can use .bind :D */}
          <button onClick={props.onDelete.bind(null, todo.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
