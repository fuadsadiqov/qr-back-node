const mongoose = require('mongoose');

const Vote = mongoose.model('Vote', { voterId: mongoose.Types.ObjectId, teamId: mongoose.Types.ObjectId });

module.exports = Vote;