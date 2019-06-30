module.exports = (sequelize, DataTypes) => (
    sequelize.define('group', {
      name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );