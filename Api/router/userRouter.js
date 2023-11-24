const express = require('express');
const { message: { SUCCESS } } = require('../utils/const');
const { registerUser, verifyUser } = require('../controller/userController');
const { adminRegistrationValidation, accountRegistrationValidation } = require('../middleware/joiValidation');

const userRouter = express.Router();

// login
userRouter.post('/login', (req, res, next) => {
  try {
    res.json({
      status: SUCCESS,
      message: 'login Success',
    });
  } catch (e) {
    next(e);
  }
});

// logout
userRouter.get('/logout', (req, res, next) => {
  try {
    res.json({
      status: SUCCESS,
      message: 'Logout Success',
    });
  } catch (e) {
    next(e);
  }
});

// admin registration
userRouter.post('/registration', adminRegistrationValidation, registerUser);
userRouter.post('/verification', accountRegistrationValidation, verifyUser);

// Reset Password
userRouter.post('/reset-password', (req, res) => {
  res.json({
    status: SUCCESS,
    message: 'Reset Password Success',
  });
});

module.exports = {
  userRouter,
};
