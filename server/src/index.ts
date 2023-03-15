import express from 'express';

const app = express();

const PORT = 8000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

app.listen(8000, () => {
  if (ENVIRONMENT === 'development') {
    console.log(`Server is running on port http://localhost:${PORT}`);
  }
  if (ENVIRONMENT === 'production') {
    const PRODUCTION_URL = 'https://www.example.com';
    console.log(`Server is running on port ${PRODUCTION_URL}`);
  }
});