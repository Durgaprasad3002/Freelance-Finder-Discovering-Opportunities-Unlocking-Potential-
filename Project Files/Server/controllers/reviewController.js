const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  const review = await Review.create(req.body);
  res.json(review);
};

exports.getFreelancerReviews = async (req, res) => {
  const reviews = await Review.find({ freelancerId: req.params.id });
  res.json(reviews);
};
