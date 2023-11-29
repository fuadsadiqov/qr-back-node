const Team = require('../models/teamModel');

// Get all teams
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new team
const createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a team by ID
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Team updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a team by ID
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
  createTeam,
  updateTeam,
  deleteTeam,
};
