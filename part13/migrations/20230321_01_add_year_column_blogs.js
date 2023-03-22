const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year_written", {
      type: DataTypes.INTEGER,
      min: 1991,
      max: new Date().getFullYear(),
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year_written");
  },
};
