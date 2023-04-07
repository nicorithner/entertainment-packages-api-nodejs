module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define(
    "Show",
    {
      title: DataTypes.STRING,
      imdb_rating: DataTypes.FLOAT,
      network_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Show",
    }
  );
  return Show;
};
