const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemRoutes = require('./routes/items');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/crud_app_db'; // your mongodb string
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


//  item routes
app.use('/items', itemRoutes);

app.get('/', (req, res) => {
  res.send('Welcome...!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
