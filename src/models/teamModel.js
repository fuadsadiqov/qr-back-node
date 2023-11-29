const mongoose = require('mongoose');

const Team = mongoose.model('Team', { name: String, participiants: Array });

module.exports = Team;