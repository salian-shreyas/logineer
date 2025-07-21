require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const machineRoutes = require('./routes/machines');
const logRoutes = require('./routes/logs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/machines', machineRoutes);
app.use('/api/logs', logRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error("Mongo error:", err));
