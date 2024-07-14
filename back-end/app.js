const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routers');
require('dotenv').config();
const path = require('path')
const fs = require('node:fs')
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/Classroom')
  .then(() => console.log('DB Connected!'))
  .catch((error) => console.log('DB connection error:', error.message));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.get('/download', function (req, res) {
  const file = req.query.file;
  const filePath = path.join(__dirname, '/data/report', file);

  if (fs.existsSync(filePath)) {
    res.download(filePath, file, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
