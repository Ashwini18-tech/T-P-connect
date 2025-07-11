import React, { useState } from "react";
import { createCompany } from "../services/companyService";
import { toast } from "react-toastify";

const CompanyForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCompany(formData);
      toast.success("Company added successfully");
      setFormData({ name: "", industry: "", website: "" });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to add company");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Company</h3>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          type="text"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Industry</label>
        <input
          name="industry"
          type="text"
          className="form-control"
          value={formData.industry}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Website</label>
        <input
          name="website"
          type="url"
          className="form-control"
          value={formData.website}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Company
      </button>
    </form>
  );
};

export default CompanyForm;
