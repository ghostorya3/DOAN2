const Class = require("../models/Class.model");
const Work = require("../models/Work.model");
const User = require("../models/User.model");
const Request = require("../models/Request.model");
const { errorServer, sendMail } = require("./Common.Service")
const { ObjectId } = require('mongodb');
const moment = require('moment');
const { pipeline } = require("nodemailer/lib/xoauth2");
const { createToken } = require("./Auth.Service");
const XLSX = require('xlsx');
const path = require('path');
const fs = require('node:fs');

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

        await Work.create({ ...body, createdBy: user })

        return { status: 200 }
    } catch (error) {
        return errorServer(error)
    }
}

exports.getWork = async (id, skip, limit, search, user) => {
    try {
        if (!id) return { result: false, status: 400, message: 'Missing body' }

        const query = {
            idClass: id
        };

        if (search?.name) query.name = new RegExp(search?.name, 'i')

        if (search?.startDate) query.hannop = {
            $gte: moment(search?.startDate).startOf('days').toDate()
        }

        if (search?.endDate) query.hannop = {
            $lte: moment(search?.endDate).endOf('days').toDate()
        }

        if (search?.startDate && search?.endDate) query.hannop = {
            $lte: moment(search?.endDate).endOf('days').toDate(),
            $gte: moment(search?.startDate).startOf('days').toDate()
        }

        if (search?.status) {
            if (search.status === 'Còn hạn') {
                query.hannop = {
                    $gte: moment().startOf('days').toDate()
                }
            } else {
                query.hannop = {
                    $lt: moment().startOf('days').toDate()
                }
            }
        }

        const data = await Work.aggregate([
            { $match: query },
            { $sort: { updatedAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'requests',
                    let: { idWork: { $toString: '$_id' }, idUser: { $toObjectId: user } },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$$idUser', '$idUser'] },
                                    { $eq: ['$type', 'submitCode'] },
                                    { $eq: ['$requestTo', '$$idWork'] },
                                ]
                            }
                        }
                    }],
                    as: 'requests'
                }
            },
            {
                $project: {
                    name: 1,
                    content: 1,
                    hannop: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    status: {
                        $cond: {
                            if: { $gt: [{ $size: "$requests" }, 0] },
                            then: {
                                $cond: {
                                    if: { $lte: ['$requests.createdAt', '$hannop'] },
                                    then: 'Đã nộp',
                                    else: 'Quá hạn'
                                }
                            },
                            else: 'Chưa nộp'
                        }
                    }
                }
            }
        ])

        const count = await Work.countDocuments({ idClass: id })
        return { status: 200, data: { data, page: count / 10 + 1 } }
    } catch (error) {
        return errorServer(error)
    }
}

exports.getDetailWork = async (id) => {
    try {
        if (!id) return { result: false, status: 400, message: 'Missing body' }
        const data = await Work.findById(id).lean()
        if (!data) return { statis: 404, message: 'Not found' }
        return { status: 200, data: { data } }
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
        });

        const userr = await User.findById(isClassExist.createdBy)

        sendMail(userr?.email, "Có người dùng muốn tham gia vào lớp học của bạn")

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

        const requestToClass = await Request.aggregate([
            { $match: { type: 'joinClass', requestTo: data.classId, status: 'pending' } },
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
        return { status: 200, data: { data, arrStudent, count, requestToClass, countRequestToClass: requestToClass.length }, message: 'success' }
    } catch (error) {
        return errorServer(error)
    }
}

exports.acceptJoinClass = async (sid, user) => {
    try {
        if (!sid) return { result: false, status: 400, message: 'Missing body' }

        const data = await Request.findByIdAndUpdate(sid, { status: 'accept' }).lean();
        if (!data) return { result: false, status: 404, message: 'Not found' }

        const classData = await Class.findOne({ createdBy: new ObjectId(user), classId: data.requestTo }).lean();
        if (!classData) return { result: false, status: 400, message: 'Not found' }

        await Class.findOneAndUpdate({ createdBy: new ObjectId(user), classId: data.requestTo }, {
            student: [
                ...classData.student,
                data.idUser
            ]
        });

        return { result: true, status: 200 }
    } catch (error) {
        return errorServer(error)
    }
}

exports.cancelJoinClass = async (sid) => {
    try {
        if (!sid) return { result: false, status: 400, message: 'Missing body' }

        const data = await Request.findByIdAndUpdate(sid, { status: 'reject' }).lean();
        if (!data) return { result: false, status: 404, message: 'Not found' }

        const user = await User.findById(data.idUser).lean();
        sendMail(user?.email, `Yêu cầu tham gia lớp học ${data.requestTo} của bạn đã bị từ chối!`)

        return { result: true, status: 200 }
    } catch (error) {
        return errorServer(error)
    }
}

exports.deleteJoinClass = async (sid, classId) => {
    try {
        if (!sid) return { result: false, status: 400, message: 'Missing body' }

        const classData = await Class.findById(classId).lean();
        if (!classData) return { result: false, status: 400, message: 'not found' }

        await Class.findByIdAndUpdate(classId, {
            student: classData.student.filter((item) => (item != sid))
        })

        const user = await User.findById(sid).lean();
        sendMail(user?.email, `Bạn đã bị xoá khỏi lớp học ${classData.classId}!`)

        return { result: true, status: 200 }
    } catch (error) {
        return errorServer(error)
    }
}

exports.getListStudentDoExcercise = async (sid, user, status, isExport, res) => {
    try {

        if (!sid) return { result: false, status: 400, message: 'Missing body' }

        const dataWork = await Work.findById(sid).lean();
        if (!dataWork) return { result: false, status: 404, message: 'Not found' }

        if (dataWork.createdBy !== user) return { result: false, status: 404, message: 'Not found' }


        const listUserInClass = await Class.findById(dataWork.idClass).lean();
        if (!listUserInClass) return { result: false, status: 404, message: 'Not found' }

        const studentInClass = listUserInClass.student.map(item => new ObjectId(item));

        const pipeline = [
            { $match: { _id: { $in: studentInClass } } },
            {
                $lookup: {
                    from: 'requests',
                    let: { idUser: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$$idUser', '$idUser'] },
                                        { $eq: ['$requestTo', sid] },
                                        { $eq: ['$type', 'submitCode'] },
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'requests'
                }
            },
            {
                $addFields: {
                    requestExists: { $cond: { if: { $or: [{ $eq: ["$requests", null] }, { $eq: [{ $size: "$requests" }, 0] }] }, then: false, else: true } }
                }
            },
            { $unwind: { path: '$requests', preserveNullAndEmptyArrays: true } },

        ]

        if (status === 'Chưa nộp') {
            pipeline.push({ $match: { requestExists: false } })
        } else if (status === 'Đã nộp') {
            pipeline.push({ $match: { requestExists: true } })
        } else if (status === 'Nộp muộn') {
            pipeline.push({
                $match: {
                    requestExists: true,
                    $expr: { $gte: ['$requests.createdAt', dataWork.hannop] }
                }
            })
        }

        if (isExport) {
            pipeline.push({
                $project: {
                    _id: 0,
                    name: '$userName',
                    point: '$requests.point',
                    createdAt: '$requests.createdAt',
                    status: {
                        $cond: {
                            if: { $eq: ["$requestExists", true] },
                            then: {
                                $cond: {
                                    if: { $lte: ['$requests.createdAt', dataWork.hannop] },
                                    then: 'Hoàn thành',
                                    else: 'Quá hạn'
                                }
                            },
                            else: 'Chưa nộp'
                        }
                    },
                }
            })
        } else {
            pipeline.push({
                $project: {
                    userName: 1,
                    createdAt: '$requests.createdAt',
                    point: '$requests.point',
                    status: {
                        $cond: {
                            if: { $eq: ["$requestExists", true] },
                            then: {
                                $cond: {
                                    if: { $lte: ['$requests.createdAt', dataWork.hannop] },
                                    then: 'Hoàn thành',
                                    else: 'Quá hạn'
                                }
                            },
                            else: 'Chưa nộp'
                        }
                    },
                    idRequest: '$requests._id',
                    idWork: dataWork._id
                }
            })
        }

        const data = await User.aggregate(pipeline)

        if (isExport) {

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
            const fileName = `report_${new Date().getTime()}.xlsx`;
            const filePath = path.join('data', 'report', fileName);

            await XLSX.writeFile(workbook, filePath);

            return {
                status: 200, data: {
                    url: fileName
                }
            }

        }
        return {
            result: true, status: 200,
            data: {
                data,
                dataWork
            }
        }
    } catch (error) {
        console.log(error)
        return errorServer(error)
    }
}

exports.chamDiem = async (sid, point) => {
    try {

        if (!sid) return { result: false, status: 400, message: 'Missing body' }

        const requestData = await Request.findById(sid).lean();
        if (!requestData) {
            return { status: 404, message: 'Not Found' }
        }

        const workData = await Work.findById(requestData.requestTo).lean();
        if (!workData) {
            return { status: 404, message: 'Not Found' }
        }


        await Request.findByIdAndUpdate(sid, {
            point: point
        });

        return {
            result: true, status: 200,
            message: 'Success'
        }
    } catch (error) {
        return errorServer(error)
    }
}