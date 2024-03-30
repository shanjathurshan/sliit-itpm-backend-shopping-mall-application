const express = require('express')
const courseController = require('./courseController')
const verifyJWT = require('../middleware/verifyJWT')
const { validateRequest } = require('../middleware/validation')
const { createCourseSchema, updateCourseSchema, getCourseByCourseIdSchema, getCourseByIdSchema, deleteCourseSchema } = require('./courseValidations')
const permissions = require('../middleware/permissions')
const { ROLES } = require('../../../constants')

const router = express.Router()

router.use(verifyJWT)

router.route('/')
    .get(permissions([ROLES.STUDENT, ROLES.ADMIN, ROLES.FACULTY]), courseController.getAllCourses)
    .post(permissions([ROLES.STUDENT, ROLES.ADMIN, ROLES.FACULTY]), validateRequest(createCourseSchema), courseController.createNewCourse)
    .patch(permissions([ROLES.STUDENT, ROLES.ADMIN, ROLES.FACULTY]), validateRequest(updateCourseSchema), courseController.updateCourse)
    .delete(permissions([ROLES.STUDENT, ROLES.ADMIN, ROLES.FACULTY]), validateRequest(deleteCourseSchema), courseController.deleteCourse)

router.route('/id')
    .get(permissions([ROLES.STUDENT, ROLES.ADMIN, ROLES.FACULTY]), validateRequest(getCourseByIdSchema), courseController.getCourseById)

router.route('/cid')
    .get(permissions([ROLES.STUDENT, ROLES.ADMIN, ROLES.FACULTY]), validateRequest(getCourseByCourseIdSchema), courseController.getCourseByCourseId)

module.exports = router
