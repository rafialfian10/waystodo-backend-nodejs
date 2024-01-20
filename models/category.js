"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", // untuk object key ketika mempreload user di data category
      });
      Category.hasMany(models.Todo, {
        foreignKey: "categoryId",
        as: {
          // untuk object key ketika mempreload todo di data category
          singular: "todo",
          plural: "todos",
        },
      });
    }
  }
  Category.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      categoryName: {
        type: DataTypes.STRING,
      },
      bgColor: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Category",
      underscored: true,
      paranoid: true,
    }
  );
  return Category;
};
