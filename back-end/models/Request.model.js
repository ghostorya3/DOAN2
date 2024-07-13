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
    point: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Request', requestSchema);




