const { z } = require("zod");

const createSlotSchema = z.object({
    course: z.string().min(1),
    hall: z.string().min(1),
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    lecturer: z.string().min(1)
});

const updateSlotSchema = z.object({
    id: z.string().min(1),
    course: z.string().min(1).optional(),
    hall: z.string().min(1).optional(),
    day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).optional(),
    startTime: z.string().min(1).optional(),
    endTime: z.string().min(1).optional(),
    lecturer: z.string().min(1).optional()
});

const deleteSlotSchema = z.object({
    id: z.string().min(1)
});

const getSlotByIdSchema = z.object({
    id: z.string().min(1)
});

module.exports = {
    createSlotSchema,
    updateSlotSchema,
    deleteSlotSchema,
    getSlotByIdSchema
};