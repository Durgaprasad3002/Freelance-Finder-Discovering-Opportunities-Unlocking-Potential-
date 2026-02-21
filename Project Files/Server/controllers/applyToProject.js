const Application = require("../models/Application");

exports.applyToProject = async (req, res) => {
  try {
    const {
      projectId,
      freelancerId,
      clientId,
      role,
      proposal,
      bidAmount
    } = req.body;

    // Basic validation
    if (!projectId || !freelancerId || !clientId) {
      return res.status(400).json({
        message: "projectId, freelancerId and clientId are required"
      });
    }

    // Role check
    if (role !== "freelancer") {
      return res.status(403).json({
        message: "Only freelancers can apply"
      });
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({
      projectId: new mongoose.Types.ObjectId(projectId),
  freelancerId: new mongoose.Types.ObjectId(freelancerId)
    });

    if (existing) {
      return res.status(409).json({
        message: "You have already applied to this project"
      });
    }

    const application = await Application.create({
      projectId,
      freelancerId,
      clientId,
      proposal,
      bidAmount,
      status: "pending"
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });
  } catch (error) {
    console.error("Apply Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
