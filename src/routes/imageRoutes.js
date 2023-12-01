const express = require('express');
const { uploadImage } = require('../controllers/imageUploadController');

const router = express.Router();

router.post('/upload', uploadImage);

module.exports = router;