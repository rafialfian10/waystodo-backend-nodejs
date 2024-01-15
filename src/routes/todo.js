const {
  getTodos, getTodo, createTodo, updateTodo, deleteTodo,
} = require("../controllers/todo");

const todo = (router) => {
  router.get("/todos", getTodos);
  router.get("/todo/:id", getTodo);
  router.post("/todo", createTodo);
  router.patch("/todo/:id", updateTodo);
  router.delete("/todo/:id", deleteTodo);
};

module.exports = todo;
