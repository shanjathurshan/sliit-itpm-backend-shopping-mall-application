const { z } = require("zod");

// Zod schemas for the request bodies
const createStaffSchema = z.object({
    userId: z.string().min(1),
    staffId: z.string().min(1),
    name: z.string().min(1),
    NIC: z.string().min(1)
});

const updateStaffSchema = z.object({
    userId: z.string().min(1),
    staffId: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    NIC: z.string().min(1).optional()
});

const deleteStaffSchema = z.object({
    userId: z.string().min(1)
});

const getStaffByIdSchema = z.object({
    id: z.string().min(1)
});

const getStaffByStaffIdSchema = z.object({
    staffId: z.string().min(1)
});

module.exports = {
    createStaffSchema,
    updateStaffSchema,
    deleteStaffSchema,
    getStaffByIdSchema,
    getStaffByStaffIdSchema
}