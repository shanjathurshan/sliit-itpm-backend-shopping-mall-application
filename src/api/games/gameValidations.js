const { z } = require("zod");

// Zod schemas for the request bodies
const createGameSchema = z.object({
    userId: z.string().min(1),
    title: z.string().min(1),
    price: z.coerce.number().min(1),
    // image: z.string().min(1)
});

const updateGameSchema = z.object({
    userId: z.string().min(1),
    title: z.string().min(1).optional(),
    price: z.number().min(1).optional(),
    image: z.string().min(1).optional()
});

const deleteGameSchema = z.object({
    id: z.string().min(1)
});

const getGameByIdSchema = z.object({
    id: z.string().min(1)
});

const getGameByGameIdSchema = z.object({
    gameId: z.string().min(1)
});

module.exports = {
    createGameSchema,
    updateGameSchema,
    deleteGameSchema,
    getGameByIdSchema,
    getGameByGameIdSchema
}