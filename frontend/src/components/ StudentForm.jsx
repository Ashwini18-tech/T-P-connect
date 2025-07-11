// // controllers/StudentController.js
// const StudentModel = require('../Models/StudentModel');

// // Example controller function
// const registerStudent = async (req, res) => {
//   try {
//     const student = new StudentModel(req.body);
//     await student.save();
//     res.status(201).json({ success: true, message: 'Student Registered' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error registering student', error });
//   }
// };

// const getAllStudents = async (req, res) => {
//   try {
//     const students = await StudentModel.find();
//     res.status(200).json({ success: true, data: students });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// };

// const getStudentById = async (req, res) => {
//   try {
//     const student = await StudentModel.findById(req.params.id);
//     res.status(200).json({ success: true, data: student });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// };

// const updateStudent = async (req, res) => {
//   try {
//     const updated = await StudentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// };

// const deleteStudent = async (req, res) => {
//   try {
//     await StudentModel.findByIdAndDelete(req.params.id);
//     res.status(200).json({ success: true, message: 'Student deleted' });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// };

// module.exports = {
//   registerStudent,
//   getAllStudents,
//   getStudentById,
//   updateStudent,
//   deleteStudent
// };

import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { addStudent } from "../services/studentService";

const StudentForm = ({ onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    branch: "",
    year: "",
    email: "",
    phone: "",
    resumeLink: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate year as number
      const dataToSend = { ...formData, year: parseInt(formData.year) };
      await addStudent(dataToSend);
      onStudentAdded(); // trigger parent refresh
      setFormData({
        name: "",
        rollNo: "",
        branch: "",
        year: "",
        email: "",
        phone: "",
        resumeLink: ""
      });
    } catch (err) {
      alert("❌ Failed to add student: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-2">
        <Col md>
          <Form.Control
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md>
          <Form.Control
            placeholder="Roll No"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md>
          <Form.Control
            placeholder="Branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md>
          <Form.Control
            type="number"
            placeholder="Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1"
            max="4"
            required
          />
        </Col>
        <Col md>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md>
          <Form.Control
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="\d{10}"
            required
          />
        </Col>
        <Col md>
          <Form.Control
            placeholder="Resume Link"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            type="url"
            required
          />
        </Col>
        <Col md="auto">
          <Button type="submit" variant="success">Add</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default StudentForm;
