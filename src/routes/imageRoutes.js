const express = require('express');
const { uploadImage, getImages, getImageById } = require('../controllers/imageUploadController');
const path = require('path');

const router = express.Router();

router.post('/upload', uploadImage);
// router.get('/uploads', getImages);
// router.get('/uploads/:id', getImageById);
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

module.exports = router;