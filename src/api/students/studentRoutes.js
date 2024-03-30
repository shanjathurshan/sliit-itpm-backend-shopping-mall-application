const express = require('express')
const router = express.Router()
const studentController = require('./studentController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { createStudentSchema, updateStudentSchema, getStudentByStudentIdSchema, getStudentByIdSchema } = require('./studentValidations')

router.use(verifyJWT)

router.route('/')
    .get(studentController.getAllStudents)
    .post(validateRequest(createStudentSchema), studentController.createNewStudent)
    .patch(validateRequest(updateStudentSchema), studentController.updateStudent)
    .delete(validateRequest(), studentController.deleteStudent)

router.route('/id')
    .get(validateRequest(getStudentByIdSchema), studentController.getStudentById)

router.route('/sid')
    .get(validateRequest(getStudentByStudentIdSchema), studentController.getStudentByStudentId)

router.route('/courses')
    .get(studentController.getStudentEnrolledCourses)

module.exports = router 