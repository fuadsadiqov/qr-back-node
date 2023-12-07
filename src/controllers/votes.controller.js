const Voter = require("../models/voterModel");
const Vote = require("../models/votesModel");

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
    const { voterId, teamId, rating } = req.body;

    const voter = await Voter.findOne({ pin: voterId });

    if(!voter){
      return res.status(400).json({error: "Voter does not exist "})
    }

    const voteExists = await Vote.exists({ voterId: voter.pin });
    if (voteExists) {
      return res.status(400).json({ error: "Vote already exists for this voter" });
    }
    const vote = new Vote({ voterId: voter.pin, teamId, rating });
    await vote.save();
    res.json(vote);
  } catch (error) {
    console.error("Error", error);
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

module.exports = {
  getVotes,
  createVote,
  updateVote,
  deleteVote,
};
