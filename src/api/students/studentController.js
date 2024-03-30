const Student = require("./studentModel");
const Enrolment = require("../enrolments/enrolmentsModel");
const asyncHandler = require("express-async-handler");

// @desc Get all students
// @route GET /students
// @access Private
const getAllStudents = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Get all students from MongoDB with pagination
  const students = await Student.find().skip(startIndex).limit(limit).lean();

  // If no students
  if (!students?.length) {
    return res.status(400).json({ message: "No students found" });
  }

  res.json(students);
});

// @desc Create new student
// @route POST /students
// @access Private
const createNewStudent = asyncHandler(async (req, res) => {
  const { studentId, name, NIC, faculty, year, semester, userId } = req.body;

  // Check for duplicate studentId
  const duplicate = await Student.findOne({ studentId })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate studentId" });
  }

  const studentObject = {
    userId,
    studentId,
    name,
    NIC,
    faculty,
    year,
    semester
  };

  // Create and store new student
  const student = await Student.create(studentObject);

  if (student) {
    res.status(201).json({ message: `New student ${studentId} created` });
  } else {
    res.status(400).json({ message: "Invalid student data received" });
  }
});

// @desc Update student
// @route PATCH /students
// @access Private
const updateStudent = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // Find the student by userId
  const student = await Student.findOne({ userId }).lean().exec();
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  // Update the student with the new data
  const updatedStudent = await Student.findOneAndUpdate(
    { userId },
    { $set: req.body },
    { new: true }
  ).lean().exec();
  res.json(updatedStudent);
});

// @desc Delete student
// @route DELETE /students
// @access Private
const deleteStudent = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // Find the student by userId
  const student = await Student.findOne({ userId }).lean().exec();
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  // Delete the student
  await Student.findOneAndDelete({ userId }).lean().exec();
  res.json({ message: "Student deleted successfully" });
});

// @desc Get student by Id
// @route GET /students/id
// @access Private
const getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const student = await
    Student
      .findById(id)
      .lean()
      .exec();
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// @desc Get student by student id
// @route GET /students/sid
// @access Private

const getStudentByStudentId = asyncHandler(async (req, res) => {
  const { studentId } = req.body;
  const student = await Student.findOne({ studentId }).lean().exec();
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json(student);
});

// @desc Get student enrolled courses details
// @route GET /students/courses
// @access Private
const getStudentEnrolledCourses = asyncHandler(async (req, res) => {
  const { studentId } = req.body;
  const enrolments = await Enrolment.find({ studentId }).populate('courseId').lean().exec();
  if (!enrolments) {
    return res.status(404).json({ message: "Enrolments not found" });
  }
  res.json(enrolments);
});

module.exports = {
  getAllStudents,
  createNewStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getStudentByStudentId,
  getStudentEnrolledCourses
};
