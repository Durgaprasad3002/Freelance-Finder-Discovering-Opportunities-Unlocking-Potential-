const Application = require("../models/Application");
const Project = require("../models/Project");

// Freelancer applies
exports.applyForProject = async (req, res) => {
  try {
    const {
      projectId,
      freelancerId,
      clientId,
      proposal,
      bidAmount
    } = req.body;

    const existing = await Application.findOne({
      projectId,
      freelancerId
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Already applied to this project" });
    }

    const application = await Application.create({
      projectId,
      freelancerId,
      clientId,
      proposal,
      bidAmount,
      status: "pending"
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Freelancer views own applications
exports.getFreelancerApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      freelancerId: req.params.freelancerId
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Client views applications for their projects
exports.getClientApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      clientId: req.params.clientId
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Client accepts / rejects
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
