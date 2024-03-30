const { z } = require("zod");

// Zod schemas for the request bodies
const createCourseSchema = z.object({
    courseId: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1)
});

const updateCourseSchema = z.object({
    id: z.string().min(1),
    courseId: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional()
});

const deleteCourseSchema = z.object({
    id: z.string().min(1)
});

const getCourseByIdSchema = z.object({
    id: z.string().min(1)
});

const getCourseByCourseIdSchema = z.object({
    courseId: z.string().min(1)
});

module.exports = {
    createCourseSchema,
    updateCourseSchema,
    deleteCourseSchema,
    getCourseByIdSchema,
    getCourseByCourseIdSchema
}