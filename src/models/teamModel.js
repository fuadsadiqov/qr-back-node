const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Vote = require("../models/votesModel");

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamMembers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

module.exports = Team;
