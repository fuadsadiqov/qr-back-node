const Voter = require('../models/voterModel');

const getVoters = async (req, res) => {
  try {
    const voters = await Voter.find();
    res.json(voters);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createVoter = async (req, res) => {
  try {
    const voter = new Voter(req.body);
    await voter.save();
    res.status(200).json(voter);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createMultipleVoters = async (req, res) => {
  try {
    const votersArr = req.body.generatedVoters;
    for (const item of votersArr) {
      const newVoter = new Voter(item);
      await newVoter.save();
    }
    res.status(200).json("Voters added successfully");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}

const updateVoter = async (req, res) => {
  try {
    const { id } = req.params;
    await Voter.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Voter updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteVoter = async (req, res) => {
  try {
    const { id } = req.params;
    await Voter.findByIdAndDelete(id);
    res.json({ message: 'Voter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getVoters,
  createVoter,
  createMultipleVoters,
  updateVoter,
  deleteVoter,
};
