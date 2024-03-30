const express = require('express')
const hallController = require('./hallController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { hallSchema, updateHallSchema, deleteHallSchema, getHallByIdSchema, getHallByNameSchema } = require('./hallValidations')

const router = express.Router()

router.use(verifyJWT)

router.route('/')
    .get(hallController.getAllHalls)
    .post(validateRequest(hallSchema), hallController.createNewHall)
    .patch(validateRequest(updateHallSchema), hallController.updateHall)
    .delete(validateRequest(deleteHallSchema), hallController.deleteHall)

router.route('/id')
    .get(validateRequest(getHallByIdSchema), hallController.getHallById)

router.route('/name')
    .get(validateRequest(getHallByNameSchema), hallController.getHallByName)

module.exports = router
