const { handleResponse } = require('../services/Common.Service');
const execServices = require('../services/Exec.Service');

exports.executeCode = async (req, res) => {
    const idUser = req.idUser;
    const data = await execServices.executeCode({ idUser: idUser, ...req.body });
    return handleResponse(res, data);
}

exports.submitCode = async (req, res) => {
    const idUser = req.idUser;
    const data = await execServices.submitCode({ idUser: idUser, ...req.body });
    return handleResponse(res, data);
}