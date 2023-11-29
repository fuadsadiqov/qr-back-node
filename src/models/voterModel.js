const mongoose = require('mongoose');

const Voter = mongoose.model('Voter', { name: String, voterId: mongoose.Types.ObjectId });

module.exports = Voter;