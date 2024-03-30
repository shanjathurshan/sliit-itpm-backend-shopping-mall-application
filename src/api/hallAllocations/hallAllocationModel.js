const mongoose = require('mongoose')

const hallAllocationSchema = new mongoose.Schema({
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    allocatedBy: { // staff id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('HallAllocation', hallAllocationSchema)
