const express = require('express')
const facultyController = require('./facultyController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { facultySchema, updateFacultySchema, deleteFacultySchema, getFacultyByIdSchema, getFacultyByShortNameSchema } = require('./facultyValidations')

const router = express.Router()

router.use(verifyJWT)

router.route('/')
    .get(facultyController.getAllFaculties)
    .post(validateRequest(facultySchema), facultyController.createNewFaculty)
    .patch(validateRequest(updateFacultySchema), facultyController.updateFaculty)
    .delete(validateRequest(deleteFacultySchema), facultyController.deleteFaculty)

router.route('/getById')
    .get(validateRequest(getFacultyByIdSchema), facultyController.getFacultyById)

router.route('/getByShortName')
    .get(validateRequest(getFacultyByShortNameSchema), facultyController.getFacultyByShortName)

module.exports = router