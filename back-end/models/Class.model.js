const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    student: {
        type: [String],
        default: []
    },
    createdBy: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    classId: {
        type: String,
        default: Math.round(new Date().getTime() / 1000),
    }
});
const Class = mongoose.model('Class', classSchema);

module.exports = Class;



