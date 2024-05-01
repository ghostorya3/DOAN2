const { handleResponse } = require('../services/Common.Service');
const userServices = require('../services/User.Service');

exports.login = (req, res) => {
    const data = userServices.login(req.body);
    return handleResponse(res, data);
}