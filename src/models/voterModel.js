const mongoose = require('mongoose');

const Voter = mongoose.model('Voter', { name: String, teamId: mongoose.Types.ObjectId });

module.exports = Voter;