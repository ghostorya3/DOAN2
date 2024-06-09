const { handleResponse } = require('../services/Common.Service');
const classService = require('../services/Class.Service');

exports.createClass = async (req, res) => {
    const idUser = req.idUser;
    const data = await classService.createClass({ idUser, ...req.body });
    return handleResponse(res, data);
}

exports.getListClass = async (req, res) => {
    const idUser = req.idUser;
    const data = await classService.getListClass(idUser);
    return handleResponse(res, data);
}

exports.getDetailClass = async (req, res) => {
    const id = req.body.id;
    const data = await classService.getDetailClass(id);
    return handleResponse(res, data);
}