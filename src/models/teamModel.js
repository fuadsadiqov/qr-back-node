const mongoose = require('mongoose');

const Team = mongoose.model('Team', { name: String, teamMembers: Array });

module.exports = Team;