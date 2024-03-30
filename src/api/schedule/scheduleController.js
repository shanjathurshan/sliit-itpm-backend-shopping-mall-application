const { createHallAllocation } = require("../hallAllocations/hallAllocationController");
const { createAllocationUtil, checkExistingAllocationUtil } = require("../hallAllocations/hallAllocationUtils");
const Schedule = require("./scheduleModel");
const asyncHandler = require("express-async-handler");

// @desc Get all schedule slots
// @route GET /slots
// @access Private
const getAllSlots = asyncHandler(async (req, res) => {
    // Get all schedule slots from MongoDB
    const slots = await Schedule.find().populate("hall").populate("hallAllocation").populate("lecturer").lean();

    // If no slots
    if (!slots?.length) {
        return res.status(400).json({ message: "No schedule slots found" });
    }

    res.json(slots);
});

// @desc Create new slot
// @route POST /slots
// @access Private
const createSlot = asyncHandler(async (req, res) => {
    const { hall, course, startTime, endTime, day, lecturer } = req.body;
    // Check if the time slot is already occupied
    const occupiedSlot = await Schedule.findOne({ startTime: { $lt: endTime }, endTime: { $gt: startTime }, day, hall }).lean().exec();
    if (occupiedSlot) {
        return res.status(409).json({ message: `Time slot for hall ${hall} on ${day} from ${startTime} - ${endTime} is already occupied. Try a different hall.` });
    }

    // day, startTime, endTime, hall
    // day, startTime, endTime, allocatedBy, hall
    // Check if an allocation exists for the given hall in between the given time slot
    const existingAllocation = await checkExistingAllocationUtil(day, startTime, endTime, hall);
    if (existingAllocation) {
        return res.status(409).json({ message: "Hall is already allocated for the given time slot" });
    }

    // Create hall allocation
    const hallAllocation = await createAllocationUtil(day, startTime, endTime, lecturer, hall);

    // Create schedule slot
    const slot = await Schedule.create({ course, startTime, endTime, day, hall, lecturer, hallAllocation: hallAllocation._id });

    res.status(201).json({ message: "Slot created successfully", slot });
});


// @desc Update a slot
// @route PATCH /schedule
// @access Private
const updateSlot = asyncHandler(async (req, res) => {
    const { id, hall, course, startTime, endTime, day, lecturer } = req.body;

    // Check if the time slot is already occupied
    const occupiedSlot = await Schedule.findOne({ startTime: { $lt: endTime }, endTime: { $gt: startTime }, day, hall }).lean().exec();
    if (occupiedSlot) {
        return res.status(409).json({ message: `Time slot for hall ${hall} on ${day} from ${startTime} - ${endTime} is already occupied. Try a different hall.` });
    }

    // day, startTime, endTime, hall
    // day, startTime, endTime, allocatedBy, hall
    // Check if an allocation exists for the given hall in between the given time slot
    const existingAllocation = await checkExistingAllocationUtil(day, startTime, endTime, hall);
    if (existingAllocation) {
        return res.status(409).json({ message: "Hall is already allocated for the given time slot" });
    }

    // Create hall allocation
    const hallAllocation = await createAllocationUtil(day, startTime, endTime, lecturer, hall);

    // Update schedule slot
    const slot = await Schedule.findByIdAndUpdate(id, { course, startTime, endTime, day, hall, lecturer, hallAllocation: hallAllocation._id }, { new: true }).lean().exec();

    res.json({ message: "Slot updated successfully", slot });
});


// TODO: if the faculty is used in anywhere else, send cannot delete error

// @desc Delete a faculty
// @route DELETE /faculties
// @access Private
const deleteFaculty = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // Does the faculty exist to delete?
    const faculty = await Faculty.findById(id).exec();

    if (!faculty) {
        return res.status(400).json({ message: "Faculty not found" });
    }

    const result = await faculty.deleteOne();

    const reply = `Faculty ${result.name}, ${result.shortName} with ID ${result._id} deleted`;

    res.json(reply);
});

// @desc Get faculty by ID
// @route GET /faculties/get
// @access Private
const getFacultyById = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // Find faculty by ID
    const faculty = await Faculty.findById(id).lean().exec();
    if (!faculty) {
        return res.status(404).json({ message: "Faculty not found" });
    }
    res.json(faculty);
});

// @desc Get faculty by shortName
// @route GET /faculties/get  
// @access Private
const getFacultyByShortName = asyncHandler(async (req, res) => {
    const { shortName } = req.body;

    // Find faculty by shortName
    const faculty = await Faculty.findOne({ shortName })
        .lean()
        .exec();

    if (!faculty) {
        return res.status(404).json({ message: "Faculty not found" });
    }
    res.json(faculty);
});


module.exports = {
    getAllSlots,
    createSlot,
};
