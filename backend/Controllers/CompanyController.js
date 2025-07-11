const CompanyModel = require("../Models/CompanyModel");

// CREATE
const createCompany = async (req, res) => {
  try {
    const company = new CompanyModel(req.body);
    await company.save();
    res.status(201).json({ message: "Company created", success: true, data: company });
  } catch (err) {
    res.status(500).json({ message: "Error creating company", success: false, error: err.message });
  }
};

// READ ALL
const getAllCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: companies });
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies", success: false, error: err.message });
  }
};

// READ ONE
const getCompanyById = async (req, res) => {
  try {
    const company = await CompanyModel.findById(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ message: "Error fetching company", success: false, error: err.message });
  }
};

// UPDATE
const updateCompany = async (req, res) => {
  try {
    const updated = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: "Company not found" });
    res.status(200).json({ success: true, message: "Company updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating company", success: false, error: err.message });
  }
};

// DELETE
const deleteCompany = async (req, res) => {
  try {
    const deleted = await CompanyModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Company not found" });
    res.status(200).json({ success: true, message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting company", success: false, error: err.message });
  }
};

module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
  };
  
