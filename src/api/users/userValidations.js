const { z } = require("zod");

// Zod schemas for the request bodies
const createUserSchema = z.object({
    email: z.string().min(1),
    roles: z.array(z.string()).min(1).optional(),
    active: z.boolean().optional(),
    password: z.string().min(1)
});

const updateUserSchema = z.object({
    id: z.string().min(1),
    email: z.string().min(1).optional(),
    roles: z.array(z.string()).min(1).optional(),
    active: z.boolean().optional(),
    password: z.string().min(1).optional()
}).refine(obj => obj.email || obj.roles || obj.active, {
    message: "At least one of email, roles, or active is required",
    path: ["email", "roles", "active"]
});

const deleteUserSchema = z.object({
    id: z.string().min(1)
});

const getUserByIdSchema = z.object({
    id: z.string().min(1)
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getUserByIdSchema
}