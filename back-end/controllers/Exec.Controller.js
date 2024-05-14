const { handleResponse } = require('../services/Common.Service');
const execServices = require('../services/Exec.Service');

exports.executeCode = (req, res) => {
    const idUser = req.idUser || 1;
    const file = req.file;
    const data = execServices.executeCode({ id: idUser, file, ...req.body });
    return handleResponse(res, data);
}