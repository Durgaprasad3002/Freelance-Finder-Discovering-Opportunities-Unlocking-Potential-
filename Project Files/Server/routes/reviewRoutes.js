const express = require("express");
const router = express.Router();
const {
  addReview,
  getFreelancerReviews
} = require("../controllers/reviewController");

// Client
router.post("/", addReview);

// Freelancer
router.get("/freelancer/:freelancerId", getFreelancerReviews);

module.exports = router;
