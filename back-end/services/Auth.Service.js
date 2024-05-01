const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createToken = async (data, time) => {
    return jwt.sign({ data }, process.env.PRIVATE_KEY, { expiresIn: time });
};

exports.verifyJwt = async (token) => {
    try {
        const data = await jwt.verify(token, process.env.PRIVATE_KEY);
        return data
    } catch (error) {
        return false;
    }
}
