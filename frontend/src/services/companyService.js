// src/services/companyService.js
import axios from "axios";

const API = "/api/companies";

export const getCompanies = () => axios.get(API);
export const addCompany = (data) => axios.post(API, data);
export const deleteCompany = (id) => axios.delete(`${API}/${id}`);
