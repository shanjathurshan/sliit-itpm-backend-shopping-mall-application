const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    staffId: {
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
    // courses: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'Course',
    //     required: true
    // }
})

module.exports = mongoose.model('Staff', staffSchema)