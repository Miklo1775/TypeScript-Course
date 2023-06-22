import { RequestHandler } from "express";

import { Todo } from "../models/todos";

const TODOS: Todo[] = [{ id: "t2", text: "Finish this course" }];

export const createTodo: RequestHandler = (req, res, next) => {
  //another way of type casting
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created Todo", createdTodo: newTodo });
};

export const getTodo: RequestHandler = (req, res, next) => {
  res.status(200).json({ message: "Success", body: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error("Could not find that todo");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] }).status(201);
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Couldnt find that todo!");
  }

  TODOS.splice(todoIndex, 1);
  res.json({ message: "Deleted!" });
};
