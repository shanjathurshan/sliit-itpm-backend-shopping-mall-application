const HallAllocation = require("./hallAllocationModel");
const asyncHandler = require("express-async-handler");
const { createAllocationUtil, deleteAllocationUtil, updateAllocationUtil } = require("./hallAllocationUtils");

// @desc Get all hall allocations
// @route GET /hall-allocations
// @access Private
const getAllHallAllocations = asyncHandler(async (req, res) => {
    // Get all hall allocations from MongoDB
    const hallAllocations = await HallAllocation.find().populate('hall').lean();

    // If no hall allocations
    if (!hallAllocations?.length) {
        return res.status(400).json({ message: "No hall allocations found" });
    }

    res.json(hallAllocations);
});

// @desc Create a new hall allocation
// @route POST /allocations
// @access Private
const createHallAllocation = asyncHandler(async (req, res) => {
    const { day, startTime, endTime, allocatedBy, hall } = req.body;

    try {
        const newAllocation = await createAllocationUtil(day, startTime, endTime, allocatedBy, hall);
        res.status(201).json(newAllocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Update a hall allocation
// @route PUT /allocations
// @access Private
const updateHallAllocation = asyncHandler(async (req, res) => {
    const { id, day, startTime, endTime, allocatedBy, hall } = req.body;

    try {
        const updatedAllocation = await updateAllocationUtil(id, day, startTime, endTime, allocatedBy, hall);
        res.json(updatedAllocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete a hall allocation
// @route DELETE /allocations
// @access Private
const deleteHallAllocation = asyncHandler(async (req, res) => {
    const allocationId = req.body.id;

    try {
        const result = await deleteAllocationUtil(allocationId);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// @desc Get a hall allocation by ID
// @route GET /allocations/id
// @access Private
const getHallAllocationById = asyncHandler(async (req, res) => {
    const allocationId = req.body.id;
    // Find the allocation by ID
    const allocation = await HallAllocation.findById(allocationId).populate('hall').lean();
    // If allocation not found
    if (!allocation) {
        return res.status(404).json({ message: "Allocation not found" });
    }
    res.json(allocation);
});

module.exports = {
    getAllHallAllocations,
    createHallAllocation,
    updateHallAllocation,
    deleteHallAllocation,
    getHallAllocationById
}
