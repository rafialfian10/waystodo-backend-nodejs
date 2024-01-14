"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryName: {
        type: Sequelize.STRING,
        field: "category_name",
      },
      bgColor: {
        type: Sequelize.STRING,
        field: "bg_color",
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.DATE,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.DATE,
        type: Sequelize.DATE,
        field: "updated_at",
      },   
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "deleted_at",
      },   
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("categories");
  },
};