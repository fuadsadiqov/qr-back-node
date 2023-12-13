const express = require('express');
const router = express.Router();
const voteController = require('../controllers/votes.controller');

router.get('/votes', voteController.getVotes);
router.get('/dashboard', voteController.getVotesWithTeams);
router.post('/votes', voteController.createVote);
router.put('/votes/:id', voteController.updateVote);
router.delete('/votes/:id', voteController.deleteVote);

module.exports = router;