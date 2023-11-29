const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URL, {
  dbName: 'invoice'
});

app.use(bodyParser.json());

// Import routes
const teamRoutes = require('./routes/teamRoutes');
const voterRoutes = require('./routes/voterRoutes');
const voteRoutes = require('./routes/votesRoutes');

// Use routes
app.use('/', teamRoutes);
app.use('/', voterRoutes);
app.use('/', voteRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});