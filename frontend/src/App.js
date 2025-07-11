import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Companies from "./pages/Companies";
import Students from "./pages/Students";
import Placements from "./pages/Placements";
import Home from "./pages/Home";
import "./App.css"
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">T&P Connect</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/students">Students</Nav.Link>
              <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
              <Nav.Link as={Link} to="/placements">Placements</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/placements" element={<Placements />} />
        </Routes>
      </Container>

      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
