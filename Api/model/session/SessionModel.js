/* eslint-disable indent */
/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    associate: {
        type: String,
        required: true,
    },
    accesstoken: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Session = mongoose.model('session', sessionSchema);
const createSession = (sessionObj) => Session.create(sessionObj);
const deleteSession = async (accesstoken) => {
    const dt = await Session.findOneAndDelete({ accesstoken });
    return dt;
};
const deleteSessionByFilter = async (filter) => Session.findOneAndDelete(filter);

module.exports = {
    createSession,
    deleteSession,
    deleteSessionByFilter,
};
