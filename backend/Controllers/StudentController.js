// backend/Controllers/StudentController.js
const StudentModel = require("../Models/StudentModel");

const registerStudent = async (req, res) => {
  try {
    const {
      name,
      rollNo,
      branch,
      year,
      email,
      phone,
      resumeLink
    } = req.body;

    // Validate all required fields
    if (!name || !rollNo || !branch || !year || !email || !phone || !resumeLink) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, rollNo, branch, year, email, phone, resumeLink) are required."
      });
    }

    const student = new StudentModel({
      name,
      rollNo,
      branch,
      year,
      email,
      phone,
      resumeLink
    });

    await student.save();
    res.status(201).json({ success: true, message: "Student Registered" });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering student",
      error
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const updateStudent = async (req, res) => {
  try {
    const updated = await StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await StudentModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

module.exports = {
  registerStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
