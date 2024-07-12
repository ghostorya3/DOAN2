const httpStatus = require("./HttpStatus.Service")
const fs = require('fs');
const axios = require('axios');
const nodemailer = require("nodemailer");
const { exec } = require('child_process');

const setPermissions = (dirPath) => {
  exec(`chmod -R 777 ${dirPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error setting permissions: ${stderr}`);
      return;
    }
    console.log(`Permissions set successfully: ${stdout}`);
  });
};

exports.handleResponse = (res, data) => {
    switch (data?.status) {
        case 200:
            return httpStatus.OK(res, data?.message, data?.data)
        case 400:a
            return httpStatus.BadRequestException(res, data?.message)
        case 401:
            return httpStatus.Unauthorized(res)
        case 403:
            return httpStatus.Forbidden(res)
        case 404:
            return httpStatus.NotFoundException(res, data?.message)
        case 500:
            return httpStatus.ErrorServerException(res, data?.message)
        case 409:
            return httpStatus.ConflictException(res, data?.message)
    }
};

exports.errorServer = (error) => {
    return {
        status: 500,
        message: error.message,
        result: false
    }
}

exports.handleSaveFile = (work, id) => {
    const path = `data/work/${id}/${work}`;

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true, mode: 0o755 });
    }
    this.setPermissions()
    return `folder=/config/workspace/${id}/${work}`
}

exports.sendResult = (result, id) => {
    let data = JSON.stringify({
        "result": result,
        id
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: process.env.DOMAIN_SOCKET,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.sendMail = async (mail, content) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "ghostorya3@gmail.com",
            pass: "ilzu yhfz jfmf cayo",
        },
    });

    const info = await transporter.sendMail({
        from: '<ghostorya3@gmail.com>', // sender address
        to: mail, // list of receivers
        subject: "Xin chào, email này được gửi từ hệ thống classroom", // Subject line
        text: content, // plain text body
        html: content, // html body
    });
    console.log("Message sent: %s", info.messageId);

}