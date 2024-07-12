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
    const user = req.idUser;

    const data = await classService.getDetailClass(id, user);
    return handleResponse(res, data);
}

exports.createWork = async (req, res) => {
    const body = req.body;
    const user = req.idUser;
    const data = await classService.createWork(body, user);
    return handleResponse(res, data);
}

exports.getWork = async (req, res) => {
    const { id, skip = 0, limit = 10 } = req.body;
    const data = await classService.getWork(id, skip, limit);
    return handleResponse(res, data);
}

exports.requestJoinClass = async (req, res) => {
    const { id } = req.body;
    const user = req.idUser;
    const data = await classService.requestJoinClass(id, user);
    return handleResponse(res, data);
}

exports.getInfoClass = async (req, res) => {
    const { sid } = req.body;
    const data = await classService.getInfoClass(sid);
    return handleResponse(res, data);
}

exports.acceptJoinClass = async (req, res) => {
    const { sid } = req.body;
    const user = req.idUser;

    const data = await classService.acceptJoinClass(sid, user);
    return handleResponse(res, data);
}

exports.cancelJoinClass = async (req, res) => {
    const { sid } = req.body;
    const data = await classService.cancelJoinClass(sid);
    return handleResponse(res, data);
}

exports.deleteJoinClass = async (req, res) => {
    const { sid, classId } = req.body;
    const data = await classService.deleteJoinClass(sid, classId);
    return handleResponse(res, data);
}