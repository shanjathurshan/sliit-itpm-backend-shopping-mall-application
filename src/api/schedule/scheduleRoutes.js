const express = require('express')
const scheduleController = require('./scheduleController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { createSlotSchema } = require('./scheduleValidations')


const router = express.Router()

router.use(verifyJWT)

router.route('/')
    .get(scheduleController.getAllSlots)
    .post(validateRequest(createSlotSchema), scheduleController.createSlot)
// .patch(validateRequest(updateFacultySchema), facultyController.updateFaculty)
// .delete(validateRequest(deleteFacultySchema), facultyController.deleteFaculty)

router.route('/id')
// .get(validateRequest(getFacultyByIdSchema), facultyController.getFacultyById)

module.exports = router