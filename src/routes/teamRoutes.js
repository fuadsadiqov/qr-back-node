const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teams.controller');

router.get('/teams', teamController.getTeams);
router.get('/teams/:id', teamController.getTeamById);
router.post('/teams', teamController.createTeam);
router.put('/teams/:id', teamController.updateTeam);
router.delete('/teams/:id', teamController.deleteTeam);

module.exports = router;