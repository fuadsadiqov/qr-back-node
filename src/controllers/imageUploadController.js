const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: {fileSize: 5 * 1024 * 1024}
// });

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
        res.status(200).json({message: "Image uploaded successfully", fileName});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error uploading image"});
    }
};

module.exports = {
    uploadImage
};
