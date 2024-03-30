const express = require('express')
const router = express.Router()
const staffController = require('./staffController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { createStaffSchema, updateStaffSchema, getStaffByStaffIdSchema, getStaffByIdSchema } = require('./staffValidations')

router.use(verifyJWT)

router.route('/')
    .get(staffController.getAllStaff)
    .post(validateRequest(createStaffSchema), staffController.createNewStaff)
    .patch(validateRequest(updateStaffSchema), staffController.updateStaff)
    .delete(validateRequest(), staffController.deleteStaff)

router.route('/id')
    .get(validateRequest(getStaffByIdSchema), staffController.getStaffById)

router.route('/sid')
    .get(validateRequest(getStaffByStaffIdSchema), staffController.getStaffByStaffId)

module.exports = router