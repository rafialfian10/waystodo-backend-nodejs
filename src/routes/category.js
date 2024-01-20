const {
  getCategoriesByUser,
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { userAuth } = require("../middleware/userAuth");

const category = (router) => {
  router.get("/categories-user", userAuth, getCategoriesByUser);
  router.get("/categories", userAuth, getCategories);
  router.get("/category/:id", userAuth, getCategory);
  router.post("/category", userAuth, createCategory);
  router.patch("/category/:id", userAuth, updateCategory);
  router.delete("/category/:id", userAuth, deleteCategory);
};

module.exports = category;
