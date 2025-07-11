import React, { useEffect, useState } from "react";
import { getStudents, addStudent, deleteStudent } from "../services/studentService";
import { Table, Button, Form, Row, Col, Alert, Card, Container } from "react-bootstrap";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    branch: "",
    year: "",
    email: "",
    phone: "",
    resumeLink: ""
  });
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addStudent(formData);
      fetchStudents();
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
      console.error("Failed to add student", err);
      setError(err.response?.data?.message || "Failed to register student");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (err) {
      console.error("Failed to delete student", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container>
      <h2 className="mb-4 text-primary fw-bold text-center">
        👨‍🎓 Student Management
      </h2>

      <Card className="shadow mb-4 border-0">
        <Card.Body>
          <h5 className="mb-3 fw-semibold">➕ Add New Student</h5>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Col><Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required /></Col>
              <Col><Form.Control type="text" placeholder="Roll No" name="rollNo" value={formData.rollNo} onChange={handleChange} required /></Col>
              <Col><Form.Control type="text" placeholder="Branch" name="branch" value={formData.branch} onChange={handleChange} required /></Col>
              <Col><Form.Control type="number" placeholder="Year" name="year" value={formData.year} onChange={handleChange} required /></Col>
            </Row>
            <Row className="mb-3">
              <Col><Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required /></Col>
              <Col><Form.Control type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} required /></Col>
              <Col><Form.Control type="url" placeholder="Resume Link" name="resumeLink" value={formData.resumeLink} onChange={handleChange} required /></Col>
              <Col><Button type="submit" variant="success" className="w-100">Add Student</Button></Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow border-0">
        <Card.Body>
          <h5 className="mb-3 fw-semibold">📋 Students List</h5>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu._id}>
                  <td>{stu.name}</td>
                  <td>{stu.rollNo}</td>
                  <td>{stu.branch}</td>
                  <td>{stu.year}</td>
                  <td>{stu.email}</td>
                  <td>{stu.phone}</td>
                  <td>
                    <a href={stu.resumeLink} target="_blank" rel="noopener noreferrer">
                      🔗 Link
                    </a>
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(stu._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">No students found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Students;