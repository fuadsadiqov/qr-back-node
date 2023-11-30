const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voterId: { type: String, required: true },
  teamId: { type: String, required: true },
  rating: { type: Number, required: true }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;