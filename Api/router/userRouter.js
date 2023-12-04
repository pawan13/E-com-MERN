const express = require('express');
const { message: { SUCCESS } } = require('../utils/const');
const {
  registerUser, verifyUser, loginUser, getAdminInfo, logOutUser, generateOTP, resetPassword,
} = require('../controller/userController');
const { adminRegistrationValidation, accountRegistrationValidation, loginValidation } = require('../middleware/joiValidation/userValidation');
const { auth, refreshAuth } = require('../middleware/authmiddleware');

const userRouter = express.Router();

// admin registration
userRouter.post('/registration', adminRegistrationValidation, registerUser);
userRouter.post('/account-verification', accountRegistrationValidation, verifyUser);

// get access token using refresh token
userRouter.get('/get-accessjwt', refreshAuth);

// Login
userRouter.post('/login', loginValidation, loginUser);

// Get Admin detail using token
userRouter.get('/', auth, getAdminInfo);

// logout
userRouter.post('/logout', logOutUser);

// Reset Password
userRouter.post('/reset-password', (req, res) => {
  res.json({
    status: SUCCESS,
    message: 'Reset Password Success',
  });
});

userRouter.post('/request-otp', generateOTP);
userRouter.post('/reset-password', resetPassword);

module.exports = {
  userRouter,
};
