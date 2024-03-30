const express = require('express')
const hallAllocationController = require('./hallAllocationController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { hallAllocationSchema, updateHallAllocationSchema, deleteHallAllocationSchema, getHallAllocationByIdSchema } = require('./hallAllocationValidations')


const router = express.Router()

router.use(verifyJWT)

router.route('/')
    .get(hallAllocationController.getAllHallAllocations)
    .post(validateRequest(hallAllocationSchema), hallAllocationController.createHallAllocation)
    .patch(validateRequest(updateHallAllocationSchema), hallAllocationController.updateHallAllocation)
    .delete(validateRequest(deleteHallAllocationSchema), hallAllocationController.deleteHallAllocation)

router.route('/id')
    .get(validateRequest(getHallAllocationByIdSchema), hallAllocationController.getHallAllocationById)


module.exports = router
