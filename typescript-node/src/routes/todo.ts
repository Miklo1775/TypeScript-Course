import { Router } from "express";
// const express = require("express");
// const Router = express.Router();

import { createTodo, getTodo, updateTodo, deleteTodo } from "../controllers/todos";

const router = Router();

router.post("/", createTodo);
router.get("/", getTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
