const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
// PORT
const PORT = process.env.PORT || 3000;
// Routes
const teamRoutes = require('./routes/teamRoutes');
const voterRoutes = require('./routes/voterRoutes');
const voteRoutes = require('./routes/votesRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();
mongoose.connect(process.env.DB_URL, {
  dbName: 'invoice'
});

app.use(cors({
  origin: "*",
}));
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use('/', teamRoutes);
app.use('/', voterRoutes);
app.use('/', voteRoutes);
app.use('/', imageRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});