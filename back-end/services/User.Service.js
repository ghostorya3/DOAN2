const { UserModel } = require("../models/User.model");
const { createToken } = require("./Auth.Service");
const { ErrorServer } = require("./Common.Service")

exports.login = async (data) => {
    try {
        const { idGoogle, email, userName, avatar } = data;

        if (!idGoogle || !email || !userName || !avatar) {
            return {
                status: 400,
                message: "Missing data"
            }
        }

        const dataUser = await UserModel.findOne({ idGoogle }).lean();
        if (!dataUser) {
            const newUser = await UserModel.create({
                idGoogle,
                email,
                userName,
                avatar
            });
            const token = await createToken(newUser, '1d')
            return {
                status: 200,
                message: "Login success",
                data: {
                    token,
                    user: newUser
                }
            }
        } else {
            const updateUser = await UserModel.findOneAndUpdate({
                idGoogle
            }, {
                userName,
                avatar
            });
            const token = await createToken(updateUser, '1d')
            return {
                status: 200,
                message: "Login success",
                data: {
                    token,
                    user: updateUser
                }
            }
        }

    } catch (error) {
        return ErrorServer(error)
    }
}