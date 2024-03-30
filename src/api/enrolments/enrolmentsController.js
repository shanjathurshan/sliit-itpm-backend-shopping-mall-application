const Enrolment = require("./enrolmentsModel");
const asyncHandler = require("express-async-handler");

// @desc Get all enrolments
// @route GET /enrolments
// @access Private
const getAllEnrolments = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Get all enrolments from MongoDB with pagination
  const enrolments = await Enrolment.find().skip(startIndex).limit(limit).lean();

  // If no enrolments
  if (!enrolments?.length) {
    return res.status(400).json({ message: "No enrolments found" });
  }

  res.json(enrolments);
});

// @desc Create new enrolment
// @route POST /enrolments
// @access Private
const createNewEnrolment = asyncHandler(async (req, res) => {
  const { courseId, studentId } = req.body;

  // Check if the enrolment already exists
  const existingEnrolment = await Enrolment.findOne({ courseId, studentId }).lean().exec();
  if (existingEnrolment) {
    return res.status(409).json({ message: "Enrolment already exists" });
  }

  // Create and store new enrolment
  const enrolment = await Enrolment.create({
    courseId,
    studentId,
    enrolledDate: new Date()
  });

  if (enrolment) {
    // Created
    res.status(201).json({ message: `New enrolment created` });
  } else {
    res.status(400).json({ message: "Invalid enrolment data received" });
  }
});

// @desc Update an enrolment
// @route PATCH /enrolments
// @access Private
const updateEnrolment = asyncHandler(async (req, res) => {
  const { id, courseId, studentId } = req.body;

  // Does the enrolment exist to update?
  const enrolment = await Enrolment.findById(id).exec();

  if (!enrolment) {
    return res.status(400).json({ message: "Enrolment not found" });
  }

  // Update enrolment properties if provided
  if (courseId) {
    enrolment.courseId = courseId;
  }

  if (studentId) {
    enrolment.studentId = studentId;
  }

  const updatedEnrolment = await enrolment.save();

  res.json({ message: `Enrolment ${updatedEnrolment._id} updated` });
});

// @desc Delete an enrolment
// @route DELETE /enrolments
// @access Private
const deleteEnrolment = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Does the enrolment exist to delete?
  const enrolment = await Enrolment.findById(id).exec();

  if (!enrolment) {
    return res.status(400).json({ message: "Enrolment not found" });
  }

  const result = await enrolment.deleteOne();

  const reply = `Enrolment ${result._id} deleted`;

  res.json(reply);
});

// @desc Get enrolment by ID
// @route GET /enrolments/id
// @access Private
const getEnrolmentById = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Find enrolment by ID
  const enrolment = await Enrolment.findById(id).lean().exec();
  if (!enrolment) {
    return res.status(404).json({ message: "Enrolment not found" });
  }
  res.json(enrolment);
});

module.exports = {
  getAllEnrolments,
  createNewEnrolment,
  updateEnrolment,
  deleteEnrolment,
  getEnrolmentById
};
