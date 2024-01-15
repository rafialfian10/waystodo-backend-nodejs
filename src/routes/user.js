const {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { userAuth } = require("../middleware/userAuth");
const { uploadFile } = require("../middleware/uploadFile")

const user = (router) => {
  router.post("/register", register);
  router.post("/login", login);
  router.get("/users", userAuth, getUsers);
  router.get("/user/:id", userAuth, getUser);
  router.patch("/user/:id", userAuth, uploadFile("photo"), updateUser);
  router.delete("/user/:id", userAuth, deleteUser);
};

module.exports = user;
