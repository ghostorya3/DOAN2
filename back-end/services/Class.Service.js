const Class = require("../models/Class.model");
const Work = require("../models/Work.model");
const { errorServer } = require("./Common.Service")
const { ObjectId } = require('mongodb');
const moment = require('moment')

exports.createClass = async (data) => {
    try {
        const name = data.name;
        if (!name) {
            return {
                status: 400,
                message: "Missing data"
            }
        }
        const isClassExist = await Class.findOne({ className: name }).lean();
        if (isClassExist) {
            return {
                status: 409,
                message: "Class is exist"
            }
        }
        await Class.create({
            className: name,
            createdBy: data.idUser
        });
        return { status: 200, message: 'Create class success' }
    } catch (error) {
        return errorServer(error)
    }
}

exports.getListClass = async (id) => {
    try {
        const userId = new ObjectId(id);
        const listClass = await Class.aggregate([
            {
                $match: {
                    $or: [
                        { createdBy: userId },
                        { student: id }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 1,
                    className: 1,
                    avatar: '$user.avatar'
                }
            }
        ])
        return {
            status: 200,
            data: { data: listClass }
        }
    } catch (error) {
        return errorServer(error)
    }
}

exports.getDetailClass = async (id, user) => {
    try {
        if (!id) return { result: false, status: 400, message: 'Missing id' }

        const data = await Class.findOne({ _id: new ObjectId(id) }).lean();

        if (data.createdBy.toString() === user) data.isTeacher = true

        return {
            status: 200,
            data: { data }
        }

    } catch (error) {

        return errorServer(error)
    }
}

exports.createWork = async (body, user) => {
    try {
        if (!body.name || !body.content || !body.hannop)
            return { result: false, status: 400, message: 'Missing body' }

        const now = moment()

        if (moment(body.hannop).isBefore(now)) {
            return { result: false, status: 400, message: 'Invalid data' }
        }

        await Work.create(body)

        return { status: 200 }
    } catch (error) {
        return errorServer(error)
    }
}

exports.getWork = async (id, skip, limit) => {
    try {
        if (!id) return { result: false, status: 400, message: 'Missing body' }
        const data = await Work.find({ idClass: id }).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean();
        const count = await Work.countDocuments({ idClass: id })
        return { status: 200, data: { data, page: count / 10 + 1 } }
    } catch (error) {
        return errorServer(error)
    }
}