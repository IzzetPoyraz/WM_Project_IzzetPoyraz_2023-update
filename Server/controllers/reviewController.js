import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'express',
  password: 'Azerty123',
  database: 'project'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database', err);
  } else {
    console.log('Connected to database');
  }
});

export const getAllReviews = (req, res) => {
  const query = 'SELECT * FROM reviews';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving reviews', err);
      res.status(500).json({ error: 'An error occurred while retrieving reviews' });
    } else {
      res.json(results);
    }
  });
};

export const createReview = (req, res) => {
  const { title, body, rating } = req.body;

  if (!title || !body || !rating) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = 'INSERT INTO reviews (title, body, rating) VALUES (?, ?, ?)';
  const values = [title, body, rating];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error creating review', err);
      res.status(500).json({ error: 'An error occurred while creating the review' });
    } else {
      res.status(201).json({ message: 'Review added successfully', reviewId: results.insertId });
    }
  });
};

export default { getAllReviews, createReview };
