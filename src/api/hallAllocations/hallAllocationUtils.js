const HallAllocation = require("./hallAllocationModel");

const checkExistingAllocationUtil = async (day, startTime, endTime, hall) => {
    const existingAllocation = await HallAllocation.findOne({
        hall,
        day,
        $or: [
            {
                $and: [
                    { startTime: { $lt: startTime } },
                    { endTime: { $gt: startTime } }
                ]
            },
            {
                $and: [
                    { startTime: { $lt: endTime } },
                    { endTime: { $gt: endTime } }
                ]
            }
        ]
    });

    return existingAllocation;
};

const createAllocationUtil = async (day, startTime, endTime, allocatedBy, hall) => {
    // Check if an existing allocation exists for the particular day of the week and within the start and end time
    const existingAllocation = await checkExistingAllocationUtil(day, startTime, endTime, hall);

    if (existingAllocation) {
        throw new Error("An allocation already exists for this day and time slot");
    }

    // Create a new hall allocation
    const newAllocation = await HallAllocation.create({
        hall,
        day,
        startTime,
        endTime,
        allocatedBy,
    });

    return newAllocation;
};

const updateAllocationUtil = async (allocationId, day, startTime, endTime, allocatedBy, hall) => {
    // Find the allocation by ID
    let allocation = await HallAllocation.findById(allocationId);

    // If allocation not found
    if (!allocation) {
        throw new Error("Allocation not found");
    }

    // Check if an existing allocation exists for the updated day, start time, and end time
    const existingAllocation = await checkExistingAllocationUtil(day, startTime, endTime, hall);

    if (existingAllocation && existingAllocation._id.toString() !== allocationId) {
        throw new Error("An allocation already exists for this day and time slot");
    }

    // Update the allocation
    allocation.day = day;
    allocation.startTime = startTime;
    allocation.endTime = endTime;
    allocation.allocatedBy = allocatedBy;
    allocation.hall = hall;

    // Save the updated allocation
    allocation = await allocation.save();

    return allocation;
};

const deleteAllocationUtil = async (allocationId) => {
    // Find the allocation by ID
    let allocation = await HallAllocation.findById(allocationId);

    // If allocation not found
    if (!allocation) {
        throw new Error("Allocation not found");
    }

    // Delete the allocation
    await allocation.remove();

    return { message: "Allocation deleted successfully" };
};

module.exports = {
    checkExistingAllocationUtil,
    createAllocationUtil,
    updateAllocationUtil,
    deleteAllocationUtil
}