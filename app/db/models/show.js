module.exports = (sequelize, DataTypes) => {
  const Show = sequelize.define(
    "Show",
    {
      title: DataTypes.STRING,
      imdb_rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Show",
    }
  );
  return Show;
};
