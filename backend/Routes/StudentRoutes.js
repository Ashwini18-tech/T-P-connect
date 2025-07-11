// backend/Routes/StudentRoutes.js
const express = require("express");
const router = express.Router();

const {
  registerStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require("../Controllers/StudentController"); 

router.post("/", registerStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
