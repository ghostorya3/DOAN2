const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    idClass: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: null,
    },
    hannop: {
        type: Date,
        default: Date.now,
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
const Work = mongoose.model('Work', workSchema);

module.exports = Work;




