const mongoose = require("mongoose");

const PlacementSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: true
  },
  package: {
    type: Number,
    required: true
  },
  placementDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("placements", PlacementSchema);
