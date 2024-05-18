const { handleResponse } = require('../services/Common.Service');
const userService = require('../services/User.Service');

exports.login = async (req, res) => {
    const data = await userService.login(req.body);
    return handleResponse(res, data);
}