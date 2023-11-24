const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { userRouter } = require('./router/userRouter');
require('dotenv').config();
const { message: { ERROR } } = require('./utils/const');

const dbConnect = require('./config/mongoDB');

const app = express();

const PORT = process.env.PORT || 3000;

// Baasic Middleware

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'server is live',
  });
});

app.use('/api/v1/admin', userRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({
    status: ERROR,
    message: err.message,
  });
});

dbConnect().then(() => {
  app.listen(PORT, (error) => (error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`)));
}).catch((error) => {
  console.log('Db connection error', error);
});
