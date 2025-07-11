// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL + '/students';

// export const getStudents = () => axios.get(API_URL);
// export const getStudentById = (id) => axios.get(`${API_URL}/${id}`);
// export const createStudent = (data) => axios.post(API_URL, data);
// export const updateStudent = (id, data) => axios.put(`${API_URL}/${id}`, data);
// export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);

// // ✅ Frontend: src/services/studentService.js
// import axios from "axios";
// const API = "/api/students";

// export const getStudents = () => axios.get(API);
// export const addStudent = (data) => axios.post(API, data);
// export const deleteStudent = (id) => axios.delete(`${API}/${id}`);


import axios from "axios";

const API = "/api/students";

export const getStudents = () => axios.get(API);
export const addStudent = (data) => axios.post(API, data);
export const deleteStudent = (id) => axios.delete(`${API}/${id}`);
