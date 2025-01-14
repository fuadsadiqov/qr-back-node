const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./sequelize');

const teamRoutes = require('./routes/teamRoutes');
const voterRoutes = require('./routes/voterRoutes');
const voteRoutes = require('./routes/votesRoutes');
const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '5mb' }));

app.use('/', teamRoutes);
app.use('/', voterRoutes);
app.use('/', voteRoutes);
app.use('/', imageRoutes);
app.use('/', authRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
