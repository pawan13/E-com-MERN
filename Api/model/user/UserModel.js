/* eslint-disable indent */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
            default: 'inactive',
        },
        role: {
            type: String,
            require: true,
          },
        fName: {
            type: String,
            required: true,
        },
        lName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            default: '',
        },
        phone: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isverified: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
            default: '',
        },
        refreshJWT: {
            type: String,
            default: '',
          },
    },
    { timestamps: true },

);
const User = mongoose.model('user', userSchema);
const createAdmin = (adminObj) => User.create(adminObj);
const getUser = (filter) => User.findOne(filter);
const updateAdmin = (filter, updateObj) => User.findOneAndUpdate(filter, updateObj);
module.exports = { createAdmin, updateAdmin, getUser };
