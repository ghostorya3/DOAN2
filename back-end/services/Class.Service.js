const Class = require("../models/Class.model");
const Work = require("../models/Work.model");
const User = require("../models/User.model");
const Request = require("../models/Request.model");
const { errorServer } = require("./Common.Service")
const { ObjectId } = require('mongodb');
const moment = require('moment');
const RequestModel = require("../models/Request.model");

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
            createdBy: data.idUser,
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

exports.requestJoinClass = async (id, user) => {
    try {
        if (!id) return { result: false, status: 400, message: 'Missing body' }

        const isClassExist = await Class.findOne({ classId: id });
        if (!isClassExist) {
            return { result: false, status: 404, message: 'Không tìm thấy Class!' }
        }

        const isJoinedClass = isClassExist.student.includes(user);
        if (isJoinedClass) {
            return { result: false, status: 400, message: 'Bạn đã tham gia lớp học này rồi!' }
        }

        if (isClassExist && isClassExist.isOpen) {
            await Class.updateOne({ classId: id }, {
                student: [
                    ...isClassExist.student,
                    user
                ]
            });
            return { status: 200, message: 'Tham gia lớp học thành công' }
        }
        const check = await Request.findOne({ idUser: user, type: 'joinClass', requestTo: id })
        if (check) return { status: 400, message: 'Bạn đã yêu cầu tham gia lớp này rồi, vui lòng chờ giáo viên đồng ý!' }

        await Request.create({
            idUser: user,
            type: 'joinClass',
            status: 'pending',
            requestTo: id
        })
        return { status: 200, message: 'Yêu cầu tham gia lớp học thành công' }
    } catch (error) {
        return errorServer(error)
    }
}

exports.getInfoClass = async (sid) => {
    try {
        if (!sid) return { result: false, status: 400, message: 'Missing body' }

        const query = await Class.aggregate([
            { $match: { _id: new ObjectId(sid) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: "createdBy"
                }
            },
            { $unwind: "$createdBy" }
        ]);

        let data = query[0];
        if (!data) {
            return { result: false, status: 404, message: 'Not found' }
        }

        const arrStudent = await Promise.all(
            data.student.map((item) => (
                User.findById(item).lean()
            ))
        );

        const count = arrStudent.length;

        const requestToClass = await RequestModel.aggregate([
            { $match: { type: 'joinClass', requestTo: '1719932852' } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'idUser',
                    foreignField: '_id',
                    as: "users"
                }
            },
            { $unwind: "$users" }
        ])
        return { status: 200, data: { data, arrStudent, count, requestToClass }, message: 'success' }
    } catch (error) {
        return errorServer(error)
    }
}