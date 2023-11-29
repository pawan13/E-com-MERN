/* eslint-disable indent */
const Joi = require('joi');

const adminRegistrationValidation = (req, res, next) => {
    try {
        console.log('Test it');
        const schema = Joi.object({
            fName: Joi.string().min(3).max(20).required(),
            lName: Joi.string().min(3).max(20).required(),
            phone: Joi.number().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
                .min(6)
                .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
                .message('Password must be at least 6 characters long, contain one number, one capital letter, and one special character'),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.json({
                status: Error,
                message: error.message,
            });
        } else {
            console.log('Validation passed');
            next();
        }
    } catch (e) {
        next(e);
    }
};
const accountRegistrationValidation = (req, res, next) => {
    try {
        console.log('Test it');
        const verificationSchema = Joi.object({
            e: Joi.string().required(),
            c: Joi.string().required(),
        });
        const { error } = verificationSchema.validate(req.body);
        if (error) {
            res.json({
                status: Error,
                message: error.message,
            });
        } else {
            console.log('Validation passed');
            next();
        }
    } catch (e) {
        next(e);
    }
};

const loginValidation = (req, res, next) => {
    try {
        const loginSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });
        const { error } = loginSchema.validate(req.body);
        if (error) {
            res.json({
                status: Error,
                message: error.message,
            });
        } else {
            console.log('Validation passed');
            next();
        }
    } catch (e) {
        next(e);
    }
};

module.exports = {
    adminRegistrationValidation,
    accountRegistrationValidation,
    loginValidation
};
