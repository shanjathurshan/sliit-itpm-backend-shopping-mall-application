const mongoose = require('mongoose')

const enrolmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrolledDate: {
        type: Date,
        required: true
    },
    grade: {
        type: String,
    }
})

module.exports = mongoose.model('Enrolment', enrolmentSchema)
// enrolment structure
// student id, course id, grade
