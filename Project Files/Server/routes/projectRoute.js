const express = require("express");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getClientProjects,
  deleteProject
} = require("../controllers/projectController");

// Client
router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/client/:clientId", getClientProjects);

// Admin
router.delete("/:id", deleteProject);

module.exports = router;
