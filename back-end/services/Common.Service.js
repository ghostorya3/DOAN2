const httpStatus = require("./HttpStatus.Service")
const fs = require('fs');
const axios = require('axios');

exports.handleResponse = (res, data) => {
    switch (data?.status) {
        case 200:
            return httpStatus.OK(res, data?.message, data?.data)
        case 400:
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

exports.handleSaveFile = (folder, work, id, file, time) => {
    const path = `code/${work}/${id}/${folder}`;
    const filePath = `code/${work}/${id}/${folder}/${time}.${folder}`;

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }

    fs.writeFile(filePath, file, (err) => {
        if (err) {
            return false
        }
    });
    return {
        path: `code/${work}/${id}/${folder}`,
        fileCode: `${time}.${folder}`
    }
}

exports.sendResult = (result, id) => {
    console.log("🚀 ~ result:", result)
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