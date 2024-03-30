const Course = require("./courseModel");
const asyncHandler = require("express-async-handler");

// @desc Get all courses
// @route GET /courses
// @access Private
const getAllCourses = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Get all courses from MongoDB with pagination
  const courses = await Course.find().skip(startIndex).limit(limit).lean();

  // If no courses
  if (!courses?.length) {
    return res.status(400).json({ message: "No courses found" });
  }

  res.json(courses);
});

// @desc Create new course
// @route POST /courses
// @access Private
const createNewCourse = asyncHandler(async (req, res) => {
  const { courseId, title, description } = req.body;

  // Check for duplicate course by id (same course name may have different codes)
  const duplicate = await Course.findOne({ courseId })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate course" });
  }

  // Create and store new course
  const course = await Course.create({ courseId, title, description });

  if (course) {
    // Created
    res.status(201).json({ message: `New course ${title}, ${description} created` });
  } else {
    res.status(400).json({ message: "Invalid course data received" });
  }
});

// @desc Update a course
// @route PATCH /courses
// @access Private
const updateCourse = asyncHandler(async (req, res) => {
  const { id, courseId, title, description } = req.body;

  // Does the course exist to update?
  const course = await Course.findById(id).exec();

  if (!course) {
    return res.status(400).json({ message: "Course not found" });
  }

  // Update course properties if provided
  if (courseId) {
    // Check for duplicate courseId
    const duplicateCourseId = await Course.findOne({ courseId, _id: { $ne: id } }).lean().exec();
    if (duplicateCourseId) {
      return res.status(409).json({ message: "Duplicate course ID" });
    }
    course.courseId = courseId;
  }

  if (description) {
    course.description = description;
  }

  const updatedCourse = await course.save();

  res.json({ message: `${updatedCourse.courseId}, ${updatedCourse.title} updated` });
});

// @desc Delete a course
// @route DELETE /courses
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Does the course exist to delete?
  const course = await Course.findById(id).exec();

  if (!course) {
    return res.status(400).json({ message: "Course not found" });
  }

  const result = await course.deleteOne();

  const reply = `Course ${result.courseId}, ${result.title} with ID ${result._id} deleted`;

  res.json(reply);
});

// @desc Get course by ID
// @route GET /courses/getById
// @access Private
const getCourseById = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Find course by ID
  const course = await Course.findById(id).lean().exec();
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
});

// @desc Get course by courseId
// @route GET /courses/getByCourseId
// @access Private
const getCourseByCourseId = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  // Find course by courseId
  const course = await Course.findOne({ courseId })
    .lean()
    .exec();

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
});

module.exports = {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getCourseByCourseId,
};
