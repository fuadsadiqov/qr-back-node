const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Team = require("../models/teamModel");

const Vote = sequelize.define('Vote', {
  voterId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Vote;
