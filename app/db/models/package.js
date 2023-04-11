module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define(
    "Package",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};
