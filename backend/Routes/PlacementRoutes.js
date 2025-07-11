const express = require("express");
const router = express.Router();
const {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  deletePlacement
} = require("../Controllers/PlacementController");

router.post("/", createPlacement);
router.get("/", getAllPlacements);
router.get("/:id", getPlacementById);
router.delete("/:id", deletePlacement);

module.exports = router;
