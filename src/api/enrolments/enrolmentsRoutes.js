const express = require('express')
const enrolmentsController = require('./enrolmentsController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { createEnrolmentSchema, updateEnrolmentSchema, deleteEnrolmentSchema, getEnrolmentByIdSchema } = require('./enrolmentsValidations')


const router = express.Router()

router.use(verifyJWT)

router.route('/')
    .get(enrolmentsController.getAllEnrolments)
    .post(validateRequest(createEnrolmentSchema), enrolmentsController.createNewEnrolment)
    .patch(validateRequest(updateEnrolmentSchema), enrolmentsController.updateEnrolment)
    .delete(validateRequest(deleteEnrolmentSchema), enrolmentsController.deleteEnrolment)

router.route('/id')
    .get(validateRequest(getEnrolmentByIdSchema), enrolmentsController.getEnrolmentById)

module.exports = router
