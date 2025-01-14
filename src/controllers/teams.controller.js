const Team = require('../models/teamModel'); 
const Vote = require('../models/votesModel'); 

const getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createTeam = async (req, res) => {
  try {
    const { name, teamMembers } = req.body;
    if (!name || !teamMembers) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const team = await Team.create({ name, teamMembers });
    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Team.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Team.destroy({ where: { id } }); 
    if (!deleted) {
      return res.status(404).json({ message: 'Team not found' });
    }

    await Vote.destroy({ where: { teamId: id } }); 

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error(error);
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
