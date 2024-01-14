const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const category = (router) => {
  router.get("/categories", getCategories);
  router.get("/category/:id", getCategory);
  router.post("/category", createCategory);
  router.patch("/category/:id", updateCategory);
  router.delete("/category/:id", deleteCategory);
};

module.exports = category;
