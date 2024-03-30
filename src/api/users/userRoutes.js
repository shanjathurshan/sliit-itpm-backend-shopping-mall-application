const express = require('express')
const router = express.Router()
const usersController = require('./usersController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { createUserSchema, updateUserSchema, deleteUserSchema, getUserByIdSchema } = require('./userValidations')
const permissions = require('../middleware/permissions')
const { ROLES } = require('../../../constants')

router.use(verifyJWT)

router.route('/')
    .get(permissions(ROLES.ADMIN), usersController.getAllUsers)
    .post(permissions(ROLES.ADMIN), validateRequest(createUserSchema), usersController.createNewUser)
    .patch(permissions(ROLES.ADMIN), validateRequest(updateUserSchema), usersController.updateUser)
    .delete(permissions(ROLES.ADMIN), validateRequest(deleteUserSchema), usersController.deleteUser)

router.route('/getById')
    .get(permissions(ROLES.ADMIN), validateRequest(getUserByIdSchema), usersController.getUserById)

module.exports = router