const Team = require('../models/teamModel');

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTeam = async (req, res) => {
  try {
    const { name, participiants } = req.body;
    if (!name || !participiants || !Array.isArray(participiants)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const team = new Team({
      name: name,
      participiants: participiants,
    });
    await team.save();
    res.status(201).json(team);
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
  createTeam,
  updateTeam,
  deleteTeam,
};
