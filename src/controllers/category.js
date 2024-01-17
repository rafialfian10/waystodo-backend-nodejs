const status = require("http-status");
const joi = require("joi");
const db = require("../database/connection");

const { Category } = require("../../models");
// ----------------------------------------------

exports.getCategories = async (req, res) => {
  try {
    // const query = "SELECT * FROM categories";
    // const categories = await db.sequelize.query(query, {
    //   type: QueryTypes.SELECT,
    // });

    const categories = await Category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "userId"],
      },
    });

    res.status(status.OK).json({
      status: status.OK,
      data: categories,
    });
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // const query =
    //   "SELECT * FROM categories LEFT JOIN users ON users.id = categories.user_id WHERE categories.id = ?";
    // const [category, metadata] = await db.sequelize.query(query, {
    //   replacements: [id],
    // });

    const categoryId = await Category.findByPk(id);
    if (!categoryId) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: "category not found" });
    }

    const category = await Category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "userId"],
      },
    });

    res.status(status.OK).json({
      status: status.OK,
      data: category,
    });
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    // create validator
    const schema = joi.object({
      user_id: joi.number().required(),
      category_name: joi.string().required(),
      bg_color: joi.string().required(),
    });

    // validate request
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(status.BAD_REQUEST).json({ message: error.message });
    }

    let category = await Category.create({
      userId: req.body.user_id,
      categoryName: req.body.category_name,
      bgColor: req.body.bg_color,
    });

    category = await Category.findOne({
      where: {
        id: category.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "userId"],
      },
    });

    res.status(status.CREATED).json({
      status: status.CREATED,
      data: category,
    });
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      throw new Error("category not found");
    }

    // update into database
    await Category.update(
      {
        // update categoryName & bgColor if it exists on request
        categoryName: req.body.category_name
          ? req.body.category_name
          : category.categoryName,
        bgColor: req.body.bg_color ? req.body.bg_color : category.bgColor,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "userId"],
      },
    });

    if (!category) {
      throw new Error("category not found");
    }

    res.status(status.OK).json({
      status: status.OK,
      data: category,
    });
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: "category not found" });
    }

    await Category.destroy({
      where: {
        id: req.params.id,
      },
      force: true, // This option performs a hard (permanent) deletion
    });

    res
      .status(status.OK)
      .json({ message: "category with id " + req.params.id + " was deleted" });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
