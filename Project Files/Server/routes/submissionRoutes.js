const express = require("express");
const router = express.Router();

const {
  submitWork,
  getFreelancerSubmissions,
  getClientSubmissions,
  updateSubmissionStatus,
  getAllSubmissions
} = require("../controllers/submissionController");

// Freelancer submits completed work
router.post("/submit", submitWork);

// Freelancer views own submissions
router.get("/freelancer/:freelancerId", getFreelancerSubmissions);

// Client views submissions
router.get("/client/:clientId", getClientSubmissions);

// Client accepts / requests revision
router.put("/:id/status", updateSubmissionStatus);

// Admin views all submissions
router.get("/admin/all", getAllSubmissions);

module.exports = router;
