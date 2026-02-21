const express = require("express");
const router = express.Router();

const {
  applyForProject,
  getFreelancerApplications,
  getClientApplications,
  updateApplicationStatus
} = require("../controllers/applicationController");

// Freelancer applies
router.post("/apply", applyForProject);

// Freelancer views own applications
router.get("/freelancer/:freelancerId", getFreelancerApplications);

// Client views applications for their projects
router.get("/client/:clientId", getClientApplications);

// Client accepts / rejects
router.put("/:id/status", updateApplicationStatus);

module.exports = router;
