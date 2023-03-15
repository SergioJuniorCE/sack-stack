import express from 'express';

const app = express();

const PORT = 8000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

app.use(express.json());

app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

app.listen(8000, () => {
  if (ENVIRONMENT === 'development') {
    console.log(`Server is running on port http://localhost:${PORT}`);
  }
  if (ENVIRONMENT === 'production') {
    const PRODUCTION_URL = 'https://www.example.com';
    console.log(`Server is running on port ${PRODUCTION_URL}`);
  }
});