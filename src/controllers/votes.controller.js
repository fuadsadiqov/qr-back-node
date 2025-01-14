const Voter = require("../models/voterModel");
const Vote = require("../models/votesModel");
const Team = require("../models/teamModel");

const getVotes = async (req, res) => {
  try {
    const votes = await Vote.findAll(); 
    res.json(votes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createVote = async (req, res) => {
  try {
    const { voterId, teamId, rating, teamName } = req.body;

    const voterEl = await Voter.findOne({ where: { pin: voterId } });
    if (!voterEl) {
      return res.status(400).json({ error: "PIN kod yanlışdır" });
    }

    const votes = await Vote.findAll();
    if(votes && votes.length)
    {
      const voteExists = await Vote.findOne({
        where: { voterId: voterEl.pin, teamId },
      });
      if (voteExists) {
        return res.status(400).json({ error: "Hər komandaya yalnız 1 dəfə səs vermək mümkündür" });
      }
    }

    const vote = await Vote.create({ voterId: voterEl.pin, teamId, teamName, rating });
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateVote = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Vote.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: "Vote not found" });
    }

    res.json({ message: "Vote updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteVote = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Vote.remove({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Vote not found" });
    }

    res.json({ message: "Vote deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMultipleVotes = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json("Invalid input. 'ids' must be an array");
    }

    await Vote.destroy({ where: { id: ids } });

    res.status(200).json("Votes deleted successfully");
  } catch (error) {
    console.error("Error deleting multiple votes:", error);
    res.status(500).json("Internal server error");
  }
};

const getVotesWithTeams = async (req, res) => {
  try {
    const votes = await Vote.findAll();
    const teams = await Team.findAll();
    
    let result = [];

    teams.forEach(team => {
      const teamVotes = votes.filter(vote => vote.teamId == team.id);
      let allPoint = 0;
      teamVotes.forEach(teamVote => {
        allPoint += teamVote.rating;
      });
      allPoint = (allPoint / teamVotes.length).toFixed(1);
      result.push({
        label: team.name,
        data: allPoint
      });
    })
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getVotes,
  getVotesWithTeams,
  createVote,
  updateVote,
  deleteVote,
  deleteMultipleVotes,
};
