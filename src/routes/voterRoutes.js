const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voters.controller');

router.get('/voters', voterController.getVoters);
router.post('/voters', voterController.createVoter);
router.put('/voters/:id', voterController.updateVoter);
router.delete('/voters/:id', voterController.deleteVoter);

module.exports = router;