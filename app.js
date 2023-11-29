const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();

mongoose.connect(process.env.DB_URL, {
  dbName: 'invoice'});

const Team = mongoose.model('Team', { name: String });
const Voter = mongoose.model('Voter', { name: String, teamId: mongoose.Types.ObjectId });
const Vote = mongoose.model('Vote', { voterId: mongoose.Types.ObjectId, teamId: mongoose.Types.ObjectId });

app.use(bodyParser.json());

app.get('/teams', async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

app.post('/teams', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.json(team);
});

app.put('/teams/:id', async (req, res) => {
  const { id } = req.params;
  await Team.findByIdAndUpdate(id, req.body);
  res.json({ message: 'Team updated successfully' });
});

app.delete('/teams/:id', async (req, res) => {
  const { id } = req.params;
  await Team.findByIdAndDelete(id);
  res.json({ message: 'Team deleted successfully' });
});

app.get('/voters', async (req, res) => {
  const voters = await Voter.find();
  res.json(voters);
});

app.post('/voters', async (req, res) => {
  const voter = new Voter(req.body);
  await voter.save();
  res.json(voter);
});

app.put('/voters/:id', async (req, res) => {
  const { id } = req.params;
  await Voter.findByIdAndUpdate(id, req.body);
  res.json({ message: 'Voter updated successfully' });
});

app.delete('/voters/:id', async (req, res) => {
  const { id } = req.params;
  await Voter.findByIdAndDelete(id);
  res.json({ message: 'Voter deleted successfully' });
});

// Routes for Votes
app.get('/votes', async (req, res) => {
  const votes = await Vote.find();
  res.json(votes);
});

app.post('/votes', async (req, res) => {
  const vote = new Vote(req.body);
  await vote.save();
  res.json(vote);
});

app.put('/votes/:id', async (req, res) => {
  const { id } = req.params;
  await Vote.findByIdAndUpdate(id, req.body);
  res.json({ message: 'Vote updated successfully' });
});

app.delete('/votes/:id', async (req, res) => {
  const { id } = req.params;
  await Vote.findByIdAndDelete(id);
  res.json({ message: 'Vote deleted successfully' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});