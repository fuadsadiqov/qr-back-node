const mongoose = require('mongoose');

const Images = mongoose.model('Images', { fileName: String });

module.exports = Images;