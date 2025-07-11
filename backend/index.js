const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const StudentRoutes = require("./Routes/StudentRoutes");
const CompanyRoutes = require("./Routes/CompanyRoutes");
const PlacementRoutes = require("./Routes/PlacementRoutes");


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error", err));

app.use("/api/students", StudentRoutes);
app.use("/api/companies", CompanyRoutes);
app.use("/api/placements", PlacementRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
