const express = require('express')
const router = express.Router()
const gameController = require('./gameController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { createGameSchema, updateGameSchema, getGameByGameIdSchema, getGameByIdSchema, deleteGameSchema } = require('./gameValidations')

// router.use(verifyJWT)

router.route('/')
    .get(gameController.getAllGames)
    .post(validateRequest(createGameSchema), gameController.createNewGame)
    .patch(validateRequest(updateGameSchema), gameController.updateGame)
    .delete(validateRequest(deleteGameSchema), gameController.deleteGame)

router.route('/id')
    .get(validateRequest(getGameByIdSchema), gameController.getGameByGameId)

router.route('/sid')
    .get(validateRequest(getGameByGameIdSchema), gameController.getGameByGameId)

router.route('/courses')
    .get(gameController.getGameEnrolledCourses)

module.exports = router 