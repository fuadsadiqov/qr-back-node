const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Voter = sequelize.define('Voter', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  voterId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Voter;
