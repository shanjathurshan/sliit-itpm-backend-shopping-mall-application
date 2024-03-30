const { z } = require("zod");

// Zod schemas for the request bodies
const hallSchema = z.object({
    hallName: z.string().min(1),
    capacity: z.number().min(1),
    building: z.string().min(1)
});

const updateHallSchema = z.object({
    id: z.string().min(1),
    hallName: z.string().min(1).optional(),
    capacity: z.number().min(1).optional(),
    building: z.string().min(1).optional()
}).refine(obj => obj.hallName || obj.capacity || obj.building, {
    message: "Either hallName, capacity, or building is required",
    path: ["hallName", "capacity", "building"]
});

const deleteHallSchema = z.object({
    id: z.string().min(1)
});

const getHallByIdSchema = z.object({
    id: z.string().min(1)
});

const getHallByNameSchema = z.object({
    hallName: z.string().min(1)
});

module.exports = {
    hallSchema,
    updateHallSchema,
    deleteHallSchema,
    getHallByIdSchema,
    getHallByNameSchema
}
