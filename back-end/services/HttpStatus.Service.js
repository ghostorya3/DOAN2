const httpStatus = {};

httpStatus.BadRequestException = (res, message) => {
    return res.status(400).json({ result: false, message, data: null })
}

httpStatus.ConflictException = (res, message) => {
    return res.status(409).json({ result: false, message, data: null })
}

httpStatus.NotFoundException = (res, message) => {
    return res.status(404).json({ result: false, message, data: null })
}

httpStatus.OK = (res, message, data = []) => {
    return res.status(200).json({ result: true, message, ...data })
}

httpStatus.ErrorServerException = (res, message) => {
    return res.status(500).json({ result: false, message, data: null })
}

httpStatus.Forbidden = (res) => {
    return res.status(403).json({ result: false, message: 'Forbidden', data: null })
}

httpStatus.Unauthorized = (res) => {
    return res.status(401).json({ result: false, message: 'Unauthorized' })
}


module.exports = httpStatus;
