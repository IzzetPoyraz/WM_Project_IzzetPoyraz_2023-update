import express from 'express';
import reviewsRouter from './routers/reviews.js';

const app = express();

app.use(express.json());
app.use('/api/reviews', reviewsRouter);
app.get('/Client/main.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile('/path/to/main.js');
  });
  

export default app;
