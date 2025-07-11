const express = require("express");
const routes = express.Router(); 

const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} = require("../Controllers/CompanyController"); 

// Define routes
routes.post("/", createCompany);             // Create
routes.get("/", getAllCompanies);            // Read all
routes.get("/:id", getCompanyById);          // Read one
routes.put("/:id", updateCompany);           // Update
routes.delete("/:id", deleteCompany);        // Delete

module.exports = routes;
