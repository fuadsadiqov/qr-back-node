const Voter = require('../models/voterModel');
const Vote = require('../models/votesModel');

const getVoters = async (req, res) => {
  try {
    const voters = await Voter.findAll();
    res.json(voters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createVoter = async (req, res) => {
  try {
    const voter = await Voter.create(req.body);
    res.status(200).json(voter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createMultipleVoters = async (req, res) => {
  try {
    const votersArr = req.body.generatedVoters;
    if (!Array.isArray(votersArr)) {
      return res.status(400).json("Invalid input. 'generatedVoters' must be an array");
    }

    await Voter.bulkCreate(votersArr);
    res.status(200).json("Voters added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

// Update a voter
const updateVoter = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Voter.update(req.body, { where: { id } }); 

    if (!updated) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    res.json({ message: 'Voter updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Voter.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    await Vote.destroy({ where: { voterId: id } });

    res.json({ message: 'Voter deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteMultipleVoters = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json("Invalid input. 'ids' must be an array");
    }

    await Voter.destroy({ where: { id: ids } });

    await Vote.destroy({ where: { voterId: ids } });

    res.status(200).json("Voters deleted successfully");
  } catch (error) {
    console.error("Error deleting multiple voters:", error);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  getVoters,
  createVoter,
  createMultipleVoters,
  updateVoter,
  deleteVoter,
  deleteMultipleVoters,
};
