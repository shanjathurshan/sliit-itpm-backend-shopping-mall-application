const { z } = require("zod");

// Zod schemas for the request bodies
const hallAllocationSchema = z.object({
    hall: z.string().min(1),
    allocatedBy: z.string().min(1),
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    startTime: z.string().min(1),
    endTime: z.string().min(1)
});

const updateHallAllocationSchema = z.object({
    id: z.string().min(1),
    hall: z.string().min(1).optional(),
    allocatedBy: z.string().min(1).optional(),
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).optional(),
    startTime: z.string().min(1).optional(),
    endTime: z.string().min(1).optional()
}).refine(obj => obj.hall || obj.allocatedBy || obj.day || obj.startTime || obj.endTime, {
    message: "At least one of hall, allocatedBy, day, startTime, or endTime is required",
    path: ["hall", "allocatedBy", "day", "startTime", "endTime"]
});

const deleteHallAllocationSchema = z.object({
    id: z.string().min(1)
});

const getHallAllocationByIdSchema = z.object({
    id: z.string().min(1)
});

module.exports = {
    hallAllocationSchema,
    updateHallAllocationSchema,
    deleteHallAllocationSchema,
    getHallAllocationByIdSchema
}