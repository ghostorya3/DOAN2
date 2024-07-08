const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    idUser: {
        type: ObjectId,
        required: true,
    },
    type: {
        type: String
    },
    status: {
        type: String,
        default: 'started'
    },
    requestTo: {
        type: String,
    },
});

module.exports = mongoose.model('Request', requestSchema);




