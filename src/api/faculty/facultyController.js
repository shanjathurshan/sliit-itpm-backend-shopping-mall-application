const Faculty = require("./facultyModel");
const asyncHandler = require("express-async-handler");

// @desc Get all faculties
// @route GET /faculties
// @access Private
const getAllFaculties = asyncHandler(async (req, res) => {
  // Get all faculties from MongoDB
  const faculties = await Faculty.find().lean();

  // If no faculties
  if (!faculties?.length) {
    return res.status(400).json({ message: "No faculties found" });
  }

  res.json(faculties);
});

// @desc Create new faculty
// @route POST /faculties
// @access Private
const createNewFaculty = asyncHandler(async (req, res) => {
  const { name, shortName } = req.body;

  // Check for duplicate faculty
  const duplicate = await Faculty.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate faculty" });
  }

  // Create and store new faculty
  const faculty = await Faculty.create({ name, shortName });

  if (faculty) {
    // Created
    res.status(201).json({ message: `New faculty ${name}, ${shortName} created` });
  } else {
    res.status(400).json({ message: "Invalid faculty data received" });
  }
});

// @desc Update a faculty
// @route PATCH /faculties
// @access Private
const updateFaculty = asyncHandler(async (req, res) => {
  const { id, name, shortName } = req.body;

  // Does the faculty exist to update?
  const faculty = await Faculty.findById(id).exec();

  if (!faculty) {
    return res.status(400).json({ message: "Faculty not found" });
  }

  // Update faculty properties if provided
  if (name) {
    // Check for duplicate name
    const duplicateName = await Faculty.findOne({ name, _id: { $ne: id } }).lean().exec();
    if (duplicateName) {
      return res.status(409).json({ message: "Duplicate faculty name" });
    }
    faculty.name = name;
  }

  if (shortName) {
    // Check for duplicate shortName
    const duplicateShortName = await Faculty.findOne({ shortName, _id: { $ne: id } }).lean().exec();
    if (duplicateShortName) {
      return res.status(409).json({ message: "Duplicate shortName" });
    }
    faculty.shortName = shortName;
  }

  const updatedFaculty = await faculty.save();

  res.json({ message: `${updatedFaculty.name}, ${updatedFaculty.shortName} updated` });
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
  getAllFaculties,
  createNewFaculty,
  updateFaculty,
  deleteFaculty,
  getFacultyById,
  getFacultyByShortName,
};
