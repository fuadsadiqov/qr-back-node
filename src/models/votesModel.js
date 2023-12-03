const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voter', required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  rating: { type: Number, required: true }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;