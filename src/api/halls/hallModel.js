const mongoose = require('mongoose')

const hallSchema = new mongoose.Schema({
    hallName: { // code. ex: "A504" etc
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    building: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Hall', hallSchema)