import React, { useRef } from "react";

import "./NewTodo.css";

type NewTodoProp = {
  setInputText?(text: string): void;
  onAddTodo: (text: string) => void;
};

const NewTodo: React.FC<NewTodoProp> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    console.log(enteredText);
    // props.setInputText(enteredText);
    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
