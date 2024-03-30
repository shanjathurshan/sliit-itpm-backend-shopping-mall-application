const { z } = require("zod");

// Zod schemas for the request bodies
const createStudentSchema = z.object({
    userId: z.string().min(1),
    studentId: z.string().min(1),
    name: z.string().min(1),
    NIC: z.string().min(1),
    faculty: z.string().min(1),
    year: z.number().min(1),
    semester: z.number().min(1)
});

const updateStudentSchema = z.object({
    userId: z.string().min(1),
    studentId: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    NIC: z.string().min(1).optional(),
    faculty: z.string().min(1).optional(),
    year: z.number().min(1).optional(),
    semester: z.number().min(1).optional()
});

const deleteStudentSchema = z.object({
    userId: z.string().min(1)
});

const getStudentByIdSchema = z.object({
    id: z.string().min(1)
});

const getStudentByStudentIdSchema = z.object({
    studentId: z.string().min(1)
});

module.exports = {
    createStudentSchema,
    updateStudentSchema,
    deleteStudentSchema,
    getStudentByIdSchema,
    getStudentByStudentIdSchema
}