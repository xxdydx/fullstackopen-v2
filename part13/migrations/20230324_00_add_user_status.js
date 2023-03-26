const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.createTable("active_sessions", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "disabled");
    await queryInterface.dropTable("active_sessions");
  },
};
