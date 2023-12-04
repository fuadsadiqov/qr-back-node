const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/imageUploadController');
const path = require('path');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5 * 1024 * 1024}
});
const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

module.exports = router;