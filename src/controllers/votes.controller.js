const Voter = require("../models/voterModel");
const Vote = require("../models/votesModel");
const Team = require('../models/teamModel');

const getVotes = async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createVote = async (req, res) => {
  try {
    const { voterId, teamId, rating, teamName } = req.body;

    const voter = await Voter.findOne({ pin: voterId });

    if(!voter){
      return res.status(400).json({error: "PIN kod yanlışdır"})
    }

    const voteExists = await Vote.exists({ voterId: voter.pin, teamId });
    if (voteExists) {
      return res.status(400).json({ error: "Hər komandaya yalnız 1 dəfə səs vermək mümkündür" });
    }
    const vote = new Vote({ voterId: voter.pin, teamId, teamName, rating });
    await vote.save();
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateVote = async (req, res) => {
  try {
    const { id } = req.params;
    await Vote.findByIdAndUpdate(id, req.body);
    res.json({ message: "Vote updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteVote = async (req, res) => {
  try {
    const { id } = req.params;
    await Vote.findByIdAndDelete(id);
    res.json({ message: "Vote deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getVotesWithTeams = async (req, res) => {
  try {
    const allVotes = await Vote.find();
    return res.status(200).json({message: allVotes})
  } catch (error) {
    return res.status(500).json({error: "Internal server error"})
  }
}

module.exports = {
  getVotes,
  getVotesWithTeams,
  createVote,
  updateVote,
  deleteVote,
};
