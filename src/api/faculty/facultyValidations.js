const { z } = require("zod");

// Zod schemas for the request bodies
const facultySchema = z.object({
    name: z.string().min(1),
    shortName: z.string().min(1)
});

const updateFacultySchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).optional(),
    shortName: z.string().min(1).optional()
}).refine(obj => obj.name || obj.shortName, {
    message: "Either name or shortName is required",
    path: ["name", "shortName"]
});

const deleteFacultySchema = z.object({
    id: z.string().min(1)
});

const getFacultyByIdSchema = z.object({
    id: z.string().min(1)
});

const getFacultyByShortNameSchema = z.object({
    shortName: z.string().min(1)
});

module.exports = {
    facultySchema,
    updateFacultySchema,
    deleteFacultySchema,
    getFacultyByIdSchema,
    getFacultyByShortNameSchema
}