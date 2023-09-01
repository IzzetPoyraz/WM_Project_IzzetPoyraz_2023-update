const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'express',
  password: 'Azerty123',
  database: 'labo7'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.get('/api/reviews', (req, res) => {
  const query = 'SELECT * FROM reviews';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving reviews:', error);
      res.status(500).json({ status: 'error', message: 'Error retrieving reviews' });
      return;
    }

    res.json({ status: 'success', data: results });
  });
});

app.listen(5500, () => {
  console.log('Server is running on port 5500');
});
