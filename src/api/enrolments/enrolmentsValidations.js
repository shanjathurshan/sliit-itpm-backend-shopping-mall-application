const { z } = require("zod");

// Zod schemas for the request bodies
const createEnrolmentSchema = z.object({
    courseId: z.string().min(1),
    studentId: z.string().min(1)
});

const updateEnrolmentSchema = z.object({
    id: z.string().min(1),
    courseId: z.string().min(1).optional(),
    studentId: z.string().min(1).optional(),
    grade: z.string().min(1).optional()
});

const deleteEnrolmentSchema = z.object({
    id: z.string().min(1)
});

const getEnrolmentByIdSchema = z.object({
    id: z.string().min(1)
});


module.exports = {
    createEnrolmentSchema,
    updateEnrolmentSchema,
    deleteEnrolmentSchema,
    getEnrolmentByIdSchema,
}
