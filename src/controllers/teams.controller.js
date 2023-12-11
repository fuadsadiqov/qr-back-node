const Team = require('../models/teamModel');
const Vote = require('../models/votesModel');

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    res.json(team);
  } catch (error) {
    res.status(500).json(error)
  }
}

const createTeam = async (req, res) => {
  try {
    const { name, teamMembers } = req.body;
    console.log(req);
    if (req.body) {
      const team = new Team({
        name: name,
        teamMembers: teamMembers,
      });
      await team.save();
      res.status(201).json(team);
    }else{
      res.status(400).json({error: "Invalid request body"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Team updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
