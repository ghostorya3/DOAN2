const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

// const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/classroom');
// conn.on('connected', () => {
//   console.log('Connected to MongoDB');
// });

app.get('/', (req, res) => {
  const { exec } = require('child_process');

  // Gọi lệnh command line
  exec('cd code/c && g++ hello.cpp -o main.exe && main.exe', (error, stdout, stderr) => {
    if (error) {
      console.error(`Lỗi: ${error.message}`);
      // Trả về lỗi cho client
      return;
    }
    if (stderr) {
      console.error(`Lỗi tiêu chuẩn: ${stderr}`);
      // Trả về lỗi cho client
      return;
    }
    console.log(`Kết quả: ${stdout}`);
    // Trả kết quả về cho client
  });
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})