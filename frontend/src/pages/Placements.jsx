import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Alert,
  Spinner,
  Card,
  Container,
} from "react-bootstrap";
import {
  getPlacements,
  addPlacement,
  deletePlacement,
} from "../services/placementService";
import { getStudents } from "../services/studentService";
import { getCompanies } from "../services/companyService";
import { toast } from "react-toastify";

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    companyId: "",
    package: "",
    placementDate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const res = await getPlacements();
      setPlacements(res.data.data);
    } catch (error) {
      toast.error("Failed to load placements");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsAndCompanies = async () => {
    try {
      const [stuRes, comRes] = await Promise.all([
        getStudents(),
        getCompanies(),
      ]);
      setStudents(stuRes.data.data);
      setCompanies(comRes.data.data);
    } catch (err) {
      toast.error("Failed to load student or company data");
    }
  };

  useEffect(() => {
    fetchPlacements();
    fetchStudentsAndCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this placement?")) {
      try {
        await deletePlacement(id);
        toast.success("Placement deleted successfully");
        fetchPlacements();
      } catch (error) {
        toast.error("Failed to delete placement");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPlacement = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addPlacement(formData);
      toast.success("Placement added successfully");
      fetchPlacements();
      setFormData({
        studentId: "",
        companyId: "",
        package: "",
        placementDate: "",
      });
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add placement");
    }
  };

  return (
    <Container>
      <h2 className="mb-4 text-primary fw-bold text-center">
        📌 Placement Records
      </h2>

      <div className="d-flex justify-content-end mb-3">
        <Button
          variant={showForm ? "secondary" : "primary"}
          onClick={() => setShowForm(!showForm)}
          className="fw-semibold"
        >
          {showForm ? "Cancel" : "➕ Add Placement"}
        </Button>
      </div>

      {showForm && (
        <Card className="shadow mb-4 border-0">
          <Card.Body>
            <h5 className="mb-3 fw-semibold text-success">
              📝 Add Placement Entry
            </h5>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleAddPlacement}>
              <Row className="mb-3">
                <Col md={3}>
                  <Form.Select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.rollNo})
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Select
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Company</option>
                    {companies.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="number"
                    name="package"
                    value={formData.package}
                    placeholder="Package (LPA)"
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    type="date"
                    name="placementDate"
                    value={formData.placementDate}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={2}>
                  <Button
                    type="submit"
                    variant="success"
                    className="w-100 fw-semibold"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Card className="shadow border-0">
          <Card.Body>
            <h5 className="mb-3 fw-semibold">📄 All Placements</h5>
            <Table striped bordered hover responsive className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Company</th>
                  <th>Package (LPA)</th>
                  <th>Placement Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {placements.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No placements found.
                    </td>
                  </tr>
                ) : (
                  placements.map((placement) => (
                    <tr key={placement._id}>
                      <td>{placement.studentId?.name || "N/A"}</td>
                      <td>{placement.studentId?.rollNo || "N/A"}</td>
                      <td>{placement.companyId?.name || "N/A"}</td>
                      <td>{placement.package}</td>
                      <td>
                        {new Date(
                          placement.placementDate
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(placement._id)}
                          className="fw-semibold"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Placements;
