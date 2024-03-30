const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Course', courseSchema)

// course structure
// course id, name, description