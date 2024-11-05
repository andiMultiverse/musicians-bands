const { Sequelize, sequelize, DataTypes, Model } = require('../db');

class Band extends Model {}

Band.init({
  name: DataTypes.STRING,
  genre: DataTypes.STRING,
}, {
  sequelize,
  modelName: "band", 
});

// Export the Band model
module.exports = {
  Band,
};