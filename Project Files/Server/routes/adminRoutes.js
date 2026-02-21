const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
const Application = require("../models/Application");

// ADMIN CHECK (no JWT, simple role)
const adminOnly = (req, res, next) => {
  if (req.query.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// Get all users
router.get("/users", adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get all projects (with skill filter)
router.get("/projects", adminOnly, async (req, res) => {
  try {
    const { skills } = req.query;

    let filter = {};

    // ✅ If skills provided → filter in MongoDB
    if (skills) {
      const skillsArray = skills.split(",");
      filter.skills = { $in: skillsArray };
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// Get all applications
router.get("/applications", adminOnly, async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

// Dashboard stats
router.get("/stats", adminOnly, async (req, res) => {
  const users = await User.countDocuments();
  const projects = await Project.countDocuments();
  const applications = await Application.countDocuments();

  res.json({ users, projects, applications });
});

module.exports = router;
