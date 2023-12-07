const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/auth', authController.isAuth);
router.post('/hasToken', authController.getAuth);

module.exports = router;