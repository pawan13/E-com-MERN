/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { message: { SUCCESS }, message } = require('../utils/const');
const { hashPassword } = require('../hepler/bcrypt');
const { createAdmin, updateAdmin } = require('../model/user/UserModel');
const { sendAccountActivationEmail } = require('../hepler/nodemailer');

const FR_URL = 'https://localhost:3000/';
const registerUser = async (req, res, next) => {
    try {
        const { password, email, fName } = req.body;
        req.body.password = hashPassword(password);
        // 1. add verification code and Save the user info to DB
        const verificationCode = uuidv4();
        req.body.verificationCode = verificationCode;
        await createAdmin(req.body);
        res.json({
            status: SUCCESS,
            message: 'Please check your email and follow instruction to activate your account',
        });

        // 2. send an email so that user can be verified
        const link = `${FR_URL}/admin_verification?c=${verificationCode}& e=${email}`;
        await sendAccountActivationEmail({ link, email, fName });
    } catch (e) {
        next(e);
    }
};
const verifyUser = async (req, res, next) => {
    try {
        const { e, c } = req.body;
        const filter = {
            email: e,
            verificationCode: c,
        };
        const updateObj = {
            isVerified: true,
            verificationCode: '',
        };
        const response = await updateAdmin(filter, updateObj);
        if (response?._id) {
            sendAccountActivationEmail({ link: `${FR_URL}/login`, email: e });
            res.json({
                status: SUCCESS,
                message: 'Your account is verfied successfully, you can login now ',
            });
        } else {
            res.json({
                status: message.ERROR,
                message: 'your link is invalid or expired',
            });
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    registerUser,
    verifyUser,
};
