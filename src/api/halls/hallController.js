const Hall = require("./hallModel");
const asyncHandler = require("express-async-handler");

// @desc Get all halls
// @route GET /halls
// @access Private
const getAllHalls = asyncHandler(async (req, res) => {
  // Get all halls from MongoDB
  const halls = await Hall.find().lean();

  // If no halls
  if (!halls?.length) {
    return res.status(400).json({ message: "No halls found" });
  }

  res.json(halls);
});

// @desc Create new hall
// @route POST /halls
// @access Private
const createNewHall = asyncHandler(async (req, res) => {
  const { hallName, capacity, building } = req.body;

  // Check for duplicate hall
  const duplicate = await Hall.findOne({ hallName })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate hall" });
  }

  // Create and store new hall
  const hall = await Hall.create({ hallName, capacity, building });

  if (hall) {
    // Created
    res.status(201).json({ message: `New hall ${hallName} created` });
  } else {
    res.status(400).json({ message: "Invalid hall data received" });
  }
});

// @desc Update a hall
// @route PATCH /halls
// @access Private
const updateHall = asyncHandler(async (req, res) => {
  const { id, hallName, capacity, building } = req.body;

  // Does the hall exist to update?
  const hall = await Hall.findById(id).exec();

  if (!hall) {
    return res.status(400).json({ message: "Hall not found" });
  }

  // Update hall properties if provided
  if (hallName) {
    // Check for duplicate hallName
    const duplicateHallName = await Hall.findOne({ hallName, _id: { $ne: id } }).lean().exec();
    if (duplicateHallName) {
      return res.status(409).json({ message: "Duplicate hall name" });
    }
    hall.hallName = hallName;
  }

  if (capacity) {
    hall.capacity = capacity;
  }

  if (building) {
    hall.building = building;
  }

  const updatedHall = await hall.save();

  res.json({ message: `Hall ${updatedHall.hallName} updated` });
});

// TODO: if the faculty is used in anywhere else, send cannot delete error

// @desc Delete a hall
// @route DELETE /halls
// @access Private
const deleteHall = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Does the hall exist to delete?
  const hall = await Hall.findById(id).exec();

  if (!hall) {
    return res.status(400).json({ message: "Hall not found" });
  }

  const result = await hall.deleteOne();

  const reply = `Hall ${result.hallName} with ID ${result._id} deleted`;

  res.json(reply);
});

// @desc Get hall by ID
// @route GET /halls/id
// @access Private
const getHallById = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Find hall by ID
  const hall = await Hall.findById(id).lean().exec();
  if (!hall) {
    return res.status(404).json({ message: "Hall not found" });
  }
  res.json(hall);
});

// @desc Get faculty by shortName
// @route GET /halls/name
// @access Private
const getHallByName = asyncHandler(async (req, res) => {
  const { hallName } = req.body;

  // Find hall by name
  const hall = await Hall.findOne({ hallName })
    .lean()
    .exec();

  if (!hall) {
    return res.status(404).json({ message: "Hall not found" });
  }
  res.json(hall);
});

module.exports = {
  getAllHalls,
  createNewHall,
  updateHall,
  deleteHall,
  getHallById,
  getHallByName
};