const { errorServer, handleSaveFile, checkFolderEmpty, sendMail } = require("./Common.Service");
const { createToken } = require("./Auth.Service");
const Work = require("../models/Work.model");
const fs = require('fs');
const RequestModel = require("../models/Request.model");
const User = require("../models/User.model");
const { ObjectId } = require('mongodb');

exports.executeCode = async (data) => {
    try {
        if (!data.idWork) {
            return {
                status: 400,
                message: "Missing data"
            }
        }
        const dataWork = await Work.findById(data.idWork).lean();
        if (!dataWork) {
            return {
                status: 404,
                message: "Not found"
            }
        }

        const path = await handleSaveFile(data.idWork, data.idUser);
        const token = await createToken({ url: path }, '1d')
        return {
            status: 200,
            message: 'success',
            data: {
                path,
                token
            }
        }
    } catch (error) {
        return errorServer(error);
    }
}


exports.submitCode = async (data) => {
    try {
        if (!data.idWork) {
            return { status: 400, message: 'Bad request' }
        }

        const isFolderEmpty = await checkFolderEmpty(data);
        if (isFolderEmpty) {
            return { status: 400, message: 'Vui lòng làm bài trước' }
        }

        const dataWork = await Work.findById(data.idWork).lean()
        if (!dataWork) {
            return { status: 404, message: 'Not found' }
        }

        const requestData = await RequestModel.findOne({ idUser: new ObjectId(data.idUser), type: 'submitCode', requestTo: data.idWork })
        if (requestData) {
            return { status: 400, message: 'Bạn đã submit bài này rồi' }
        }

        const dataStudent = await User.findById(data.idUser).lean()
        const dataTeacher = await User.findById(dataWork.createdBy).lean()

        if (!dataStudent || !dataTeacher) return { status: 400, message: 'Bad request' }

        await RequestModel.create({
            idUser: data.idUser,
            type: 'submitCode',
            status: 'success',
            requestTo: data.idWork
        });

        sendMail(dataTeacher.email, `Học sinh ${dataStudent.userName} đã nộp bài ${dataWork.name}`)

        return {
            status: 200,
            message: 'success',
        }
    } catch (error) {
        return errorServer(error);
    }
}













