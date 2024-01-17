const {
  getTodosByUser,
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");
const { userAuth } = require("../middleware/userAuth");

const todo = (router) => {
  router.get("/todos-user", userAuth, getTodosByUser);
  router.get("/todos", userAuth, getTodos);
  router.get("/todo/:id", userAuth, getTodo);
  router.post("/todo", userAuth, createTodo);
  router.patch("/todo/:id", userAuth, updateTodo);
  router.delete("/todo/:id", userAuth, deleteTodo);
};

module.exports = todo;
