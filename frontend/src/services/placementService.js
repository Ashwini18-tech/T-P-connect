import axios from "axios";

const API_BASE = "/api/placements";

// ✅ Get all placements
export const getPlacements = () => axios.get(API_BASE);

// ✅ Add a new placement
export const addPlacement = (data) => axios.post(API_BASE, data);

// ✅ Delete a placement
export const deletePlacement = (id) => axios.delete(`${API_BASE}/${id}`);
