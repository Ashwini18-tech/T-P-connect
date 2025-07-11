import React, { useEffect, useState } from "react";
import { createPlacement } from "../services/placementService";
import { getStudents } from "../services/studentService";
import { getCompanies } from "../services/companyService";
import { toast } from "react-toastify";

const PlacementForm = ({ onSuccess }) => {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    companyId: "",
    package: "",
    placementDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stuRes = await getStudents();
        setStudents(stuRes.data.data);

        const compRes = await getCompanies();
        setCompanies(compRes.data.data);
      } catch (error) {
        toast.error("Failed to load students or companies");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.studentId ||
      !formData.companyId ||
      !formData.package ||
      !formData.placementDate
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await createPlacement(formData);
      toast.success("Placement added successfully");
      setFormData({
        studentId: "",
        companyId: "",
        package: "",
        placementDate: "",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to add placement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Placement</h3>

      <div className="mb-3">
        <label className="form-label">Student</label>
        <select
          name="studentId"
          className="form-select"
          value={formData.studentId}
          onChange={handleChange}
          required
        >
          <option value="">Select Student</option>
          {students.map((stu) => (
            <option key={stu._id} value={stu._id}>
              {stu.name} ({stu.rollNo})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Company</label>
        <select
          name="companyId"
          className="form-select"
          value={formData.companyId}
          onChange={handleChange}
          required
        >
          <option value="">Select Company</option>
          {companies.map((comp) => (
            <option key={comp._id} value={comp._id}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Package (LPA)</label>
        <input
          name="package"
          type="number"
          step="0.1"
          className="form-control"
          value={formData.package}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Placement Date</label>
        <input
          name="placementDate"
          type="date"
          className="form-control"
          value={formData.placementDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Placement
      </button>
    </form>
  );
};

export default PlacementForm;
