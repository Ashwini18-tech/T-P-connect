import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Alert, Card, Container } from "react-bootstrap";
import { getCompanies, addCompany, deleteCompany } from "../services/companyService";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    hiring: false,
  });
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      const res = await getCompanies();
      setCompanies(res.data.data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addCompany(formData);
      fetchCompanies();
      setFormData({
        name: "",
        website: "",
        email: "",
        phone: "",
        address: "",
        hiring: false,
      });
    } catch (err) {
      console.error("Failed to add company", err);
      setError(err.response?.data?.message || "Failed to register company");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      fetchCompanies();
    } catch (err) {
      console.error("Failed to delete company", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Container>
      <h2 className="text-center text-primary fw-bold mb-4">🏢 Companies List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="p-4 shadow mb-4 border-0">
        <h5 className="mb-3 fw-semibold text-success">➕ Add New Company</h5>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="Company Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="url"
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Col>
            <Col className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Hiring?"
                name="hiring"
                checked={formData.hiring}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Button type="submit" variant="primary" className="w-100 fw-semibold">
                Add Company
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="shadow border-0">
        <Card.Body>
          <h5 className="mb-3 fw-semibold">📄 Registered Companies</h5>
          <Table striped bordered hover responsive className="mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Hiring</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td>{company.name}</td>
                  <td>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      Visit
                    </a>
                  </td>
                  <td>{company.email}</td>
                  <td>{company.phone}</td>
                  <td>{company.address}</td>
                  <td>{company.hiring ? "✅ Yes" : "❌ No"}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(company._id)}
                      className="fw-semibold"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Companies;
