module.exports = (sequelize, DataTypes) => {
  const Network = sequelize.define(
    "Network",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Network",
    }
  );
  return Network;
};
