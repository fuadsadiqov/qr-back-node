const Vote = require('../models/votesModel');

// Get all votes
const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new vote
const createVote = async (req, res) => {
  try {
    const vote = new Vote(req.body);
    await vote.save();
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a vote by ID
const updateVote = async (req, res) => {
  try {
    const { id } = req.params;
    await Vote.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Vote updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a vote by ID
const deleteVote = async (req, res) => {
  try {
    const { id } = req.params;
    await Vote.findByIdAndDelete(id);
    res.json({ message: 'Vote deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getVotes,
  createVote,
  updateVote,
  deleteVote,
};