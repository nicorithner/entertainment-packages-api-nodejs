module.exports = (sequelize, DataTypes) => {
  const PackageNetwork = sequelize.define(
    "PackageNetwork",
    {
      network_id: DataTypes.INTEGER,
      package_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PackageNetworks",
    }
  );
  return PackageNetwork;
};
