
// src/pages/Home.jsx
import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.background}>
      <Container className="text-center text-white py-5">
        <h1 className="mb-3 fw-bold" style={styles.heading}>
          🚀 Welcome to <span style={styles.highlight}>T&P Connect</span>
        </h1>
        <p className="mb-5 fs-5">
          Your one-stop portal for managing all Training & Placement activities.
        </p>

        <Row className="justify-content-center">
          {sections.map(({ title, text, color, path, variant }) => (
            <Col md={4} className="mb-4" key={title}>
              <Card
                className="h-100 shadow-lg text-dark"
                style={{ borderTop: `5px solid ${color}`, transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Body>
                  <Card.Title className="fw-semibold fs-4">{title}</Card.Title>
                  <Card.Text>{text}</Card.Text>
                  <Button variant={variant} onClick={() => navigate(path)}>
                    Go to {title}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const styles = {
  background: {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    minHeight: "100vh",
  },
  heading: {
    color: "#ffffff",
  },
  highlight: {
    color: "#00d4ff",
  },
};

const sections = [
  {
    title: "Students",
    text: "View, add, and manage student records efficiently.",
    color: "#0d6efd",
    path: "/students",
    variant: "primary",
  },
  {
    title: "Companies",
    text: "Track visiting companies and their hiring status.",
    color: "#198754",
    path: "/companies",
    variant: "success",
  },
  {
    title: "Placements",
    text: "Record and view all placement offers and selections.",
    color: "#0dcaf0",
    path: "/placements",
    variant: "info",
  },
];

export default Home;
