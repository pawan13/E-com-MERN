/* eslint-disable indent */
const Joi = require('joi');
const { message: { ERROR } } = require('../../utils/const');

const createCategoryValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            status: Joi.string().valid('active' || 'inactive'),
        });
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.json({
                error: ERROR,
                message: error.message,
            });
        } else {
            next();
        }
    } catch (e) {
        next(e);
    }
};

module.exports = { createCategoryValidation };
