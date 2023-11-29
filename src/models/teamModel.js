const mongoose = require('mongoose');

const Team = mongoose.model('Team', { name: String });

module.exports = Team;