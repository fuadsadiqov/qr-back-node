const express = require('express');
const { uploadImage } = require('../controllers/imageUploadController');
const path = require('path');

const router = express.Router();

router.post('/upload', uploadImage);
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

module.exports = router;