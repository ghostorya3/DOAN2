const Class = require("../models/Class.model");
const { errorServer } = require("./Common.Service")
const { ObjectId } = require('mongodb');

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