const Staff = require("./staffModel");
const asyncHandler = require("express-async-handler");

// @desc Get all staff
// @route GET /staff
// @access Private
const getAllStaff = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Get all staff from MongoDB with pagination
  const staff = await Staff.find().skip(startIndex).limit(limit).lean();

  // If no staff
  if (!staff?.length) {
    return res.status(400).json({ message: "No staff found" });
  }

  res.json(staff);
});

// @desc Create new staff
// @route POST /staff
// @access Private
const createNewStaff = asyncHandler(async (req, res) => {
  const { staffId, name, NIC, userId } = req.body;

  // Check for duplicate staffId
  const duplicate = await Staff.findOne({ staffId })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate staffId" });
  }

  const staffObject = {
    userId,
    staffId,
    name,
    NIC
  };

  // Create and store new staff
  const staff = await Staff.create(staffObject);
  if (staff) {
    res.status(201).json({ message: `New staff ${staffId} created` });
  } else {
    res.status(400).json({ message: "Invalid staff data received" });
  }
});


// @desc Update staff
// @route PATCH /staff
// @access Private
const updateStaff = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // Find the staff by userId
  const staff = await Staff.findOne({ userId }).lean().exec();
  if (!staff) {
    return res.status(404).json({ message: "Staff not found" });
  }
  // Update the staff with the new data
  const updatedStaff = await Staff.findOneAndUpdate(
    { userId },
    { $set: req.body },
    { new: true }
  ).lean().exec();
  res.json(updatedStaff);
});

// @desc Delete staff
// @route DELETE /staff
// @access Private
const deleteStaff = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // Find the staff by userId
  const staff = await Staff.findOne({ userId }).lean().exec();
  if (!staff) {
    return res.status(404).json({ message: "Staff not found" });
  }
  // Delete the staff
  await Staff.findOneAndDelete({ userId }).lean().exec();
  res.json({ message: "Staff deleted successfully" });
});

// @desc Get staff by Id
// @route GET /staff/id
// @access Private
const getStaffById = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const staff = await
    Staff
      .findById(id)
      .lean()
      .exec();
  if (!staff) {
    return res.status(404).json({ message: "Staff not found" });
  }
  res.json(staff);
});

// @desc Get staff by staff id
// @route GET /staff/sid
// @access Private
const getStaffByStaffId = asyncHandler(async (req, res) => {
  const { staffId } = req.body;
  const staff = await Staff.findOne({ staffId }).lean().exec();
  if (!staff) {
    return res.status(404).json({ message: "Staff not found" });
  }
  res.json(staff);
});

module.exports = {
  getAllStaff,
  createNewStaff,
  updateStaff,
  deleteStaff,
  getStaffById,
  getStaffByStaffId
};
