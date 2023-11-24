/* eslint-disable indent */
/* eslint-disable linebreak-style */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendAccountActivationEmail = async ({ link, email, fName }) => {
    await transporter.sendMail({
        from: '"TechWorld" <Info@techworld.com>', // sender address
        to: email, // list of receivers
        subject: 'Account activation required', // Subject line
        text: `Hello ${fName}`, // plain text body
        html: `
            < p >
            Hello ${fName},
        please click on this link to activate! ${link}
        </p > `, // html body
    });
};
const sendAccountActivatedVerificationEmail = async ({ link, email }) => {
    await transporter.sendMail({
        from: '"TechWorld" <Info@techworld.com>', // sender address
        to: email, // list of receivers
        subject: 'Account successfully activated', // Subject line
        text: 'Hello there', // plain text body
        html: `
            < p >
            Hello ,
        please click on this link to activate! ${link}
        </p > `, // html body
    });
};

module.exports = {
    sendAccountActivationEmail,
    sendAccountActivatedVerificationEmail,
};
