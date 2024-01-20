const status = require("http-status");
const joi = require("joi");

const { User, Todo, Category } = require("../../models");
// ------------------------------------------------

exports.getTodosByUser = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        userId: req.userData.id,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
      ],
    });

    if (todos.length < 1) {
      throw new Error("todos is empty");
    }

    res.status(status.OK).json({
      status: status.OK,
      data: todos,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
      ],
    });

    res.status(status.OK).json({
      status: status.OK,
      data: todos,
    });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ message: error.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const todoId = await Todo.findByPk(id);
    if (!todoId) {
      return res.status(status.NOT_FOUND).json({ message: "todo not found" });
    }

    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
      ],
    });

    res.status(status.OK).json({
      status: status.OK,
      data: todo,
    });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    // create validator
    const schema = joi.object({
      user_id: joi.number().required(),
      category_id: joi.number().required(),
      title: joi.string().required(),
      description: joi.string().required(),
      is_done: joi.boolean(),
      bg_color: joi.string().required(),
      date: joi.date().iso(),
    });

    // validate request
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }

    let todo = await Todo.create({
      userId: req.body.user_id,
      categoryId: req.body.category_id,
      title: req.body.title,
      description: req.body.description,
      isDone: false,
      bgColor: req.body.bg_color,
      date: req.body.date ? new Date(req.body.date) : new Date(),
    });

    todo = await Todo.findOne({
      where: {
        id: todo.id,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
      ],
    });

    res.status(status.CREATED).json({
      status: status.CREATED,
      data: todo,
    });
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    let todo = await Todo.findOne({
      where: {
        //   userId: req.userData.id,
        id: req.params.id,
      },
    });

    if (!todo) {
      throw new Error("todo not found");
    }

    if (req.body.category_id) {
      todo.categoryId = req.body.category_id;
    }

    if (req.body.title) {
      todo.title = req.body.title;
    }

    if (req.body.description) {
      todo.description = req.body.description;
    }

    if (req.body.hasOwnProperty("is_done")) {
      todo.isDone = req.body.is_done;
    }

    if (req.body.bg_color) {
      todo.bgColor = req.body.bg_color;
    }

    if (req.body.date) {
      todo.date = req.body.date;
    }

    todo = await todo.save();

    todo = await Todo.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "deletedAt",
          "userId",
          "categoryId",
        ],
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
      ],
    });

    res.status(status.OK).json({
      status: status.OK,
      data: todo,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    const todo = await Todo.findByPk(todoId);
    if (!todo) {
      return res.status(status.NOT_FOUND).json({ message: "todo not found" });
    }

    await Todo.destroy({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(status.OK)
      .json({ message: `todo with id ${req.params.id} has been deleted` });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
