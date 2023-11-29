/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

const { createSession } = require('../model/session/SessionModel');
const { updateAdmin } = require('../model/user/UserModel');

const JWT_ACCESS_SECRET = '1234erfsafd425sfdass';
const JWT_REFRESH_SECRET = 'ds3443erfgrpo';

const createAcessJWT = async (userInfo) => {
    const token = jwt.sign(userInfo, JWT_ACCESS_SECRET, { expiresIn: '15m' });
    await createSession({ accessToken: token, associate: userInfo.email });
    return token;
};

const createRefreshJWT = async (userInfo) => {
    const token = jwt.sign(userInfo, JWT_REFRESH_SECRET, { expiresIn: '30d' });
    //   Save this token in db before returning it
    //    save it in user collection
    await updateAdmin({ email: userInfo.email }, { refreshToken: token });
    return token;
};

module.exports = {
    createAcessJWT,
    createRefreshJWT,
};
