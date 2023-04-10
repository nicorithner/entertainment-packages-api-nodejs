module.exports = (sequelize, DataTypes) => {
  const PackageNetwork = sequelize.define(
    "PackageNetwork",
    {
      NetworkId: DataTypes.INTEGER,
      PackageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PackageNetwork",
    }
  );
  return PackageNetwork;
};
