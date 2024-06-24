const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routers');
require('dotenv').config();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Classroom')
  .then(() => console.log('DB Connected!'))
  .catch((error) => console.log('DB connection error:', error.message));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', router);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
