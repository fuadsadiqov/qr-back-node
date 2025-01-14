const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const Image = require('../models/imageModel');

const ensureDirectoryExists = (directory) => {
  const fullPath = path.resolve(directory);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
};

const uploadImage = async (req, res) => {
  const base64Image = req.body.base64Image;

  try {
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const image = sharp(imageBuffer);

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1000000)}.jpg`;
    const uploadPath = path.join('uploads', fileName);
    ensureDirectoryExists('uploads');

    await image.toFile(uploadPath);

    const newImage = await Image.create({ fileName });
    res.status(200).json({ message: 'Image uploaded successfully', fileName });
  } catch (error) {
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'Payload too large' });
    }

    console.error(error);
    res.status(500).json({ message: 'Error uploading image' });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  uploadImage,
  getImages,
  getImageById,
};
