const PlacementModel = require("../Models/PlacementModel");

// ✅ CREATE Placement
const createPlacement = async (req, res) => {
  try {
    const { studentId, companyId, package: pkg, placementDate } = req.body;

    if (!studentId || !companyId || !pkg || !placementDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: studentId, companyId, package, placementDate"
      });
    }

    const newPlacement = new PlacementModel({
      studentId,
      companyId,
      package: pkg,
      placementDate
    });

    await newPlacement.save();

    res.status(201).json({
      success: true,
      message: "Placement created successfully",
      data: newPlacement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating placement",
      error: error.message
    });
  }
};

// ✅ GET All Placements
const getAllPlacements = async (req, res) => {
  try {
    const placements = await PlacementModel.find()
      .populate("studentId", "name rollNo")
      .populate("companyId", "name website")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: placements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching placements",
      error: error.message
    });
  }
};

// ✅ GET Single Placement by ID
const getPlacementById = async (req, res) => {
  try {
    const placement = await PlacementModel.findById(req.params.id)
      .populate("studentId", "name rollNo")
      .populate("companyId", "name website");

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found"
      });
    }

    res.status(200).json({
      success: true,
      data: placement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching placement",
      error: error.message
    });
  }
};

// ✅ DELETE Placement
const deletePlacement = async (req, res) => {
  try {
    const deleted = await PlacementModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Placement not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Placement deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting placement",
      error: error.message
    });
  }
};

module.exports = {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  deletePlacement
};
