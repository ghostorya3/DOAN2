const User = require("../models/User.model");
const { createToken } = require("./Auth.Service");
const { errorServer } = require("./Common.Service")

exports.login = async (data) => {
    try {
        const { uid, email, displayName, photoURL } = data;

        const idGoogle = uid;
        const userName = displayName;
        const avatar = photoURL;

        if (!idGoogle || !email || !userName || !avatar) {
            return {
                status: 400,
                message: "Missing data"
            }
        }

        const dataUser = await User.findOne({ idGoogle }).lean();
        if (!dataUser) {
            const newUser = await User.create({
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
            const updateUser = await User
                .findOneAndUpdate({ idGoogle }, { $set: { userName, avatar } }, { new: true });
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
        return errorServer(error)
    }
}