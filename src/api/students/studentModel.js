const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Student', studentSchema)

// student details
// user id (relation with user model), student id, name, NIC, faculty (relation with faculty model), year, semester