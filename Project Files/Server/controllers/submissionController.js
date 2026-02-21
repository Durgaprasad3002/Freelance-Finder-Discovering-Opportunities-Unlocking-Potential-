const Submission = require("../models/Submission");

/**
 * Freelancer submits work
 */
const Application = require("../models/Application"); // ✅ import this

exports.submitWork = async (req, res) => {
  try {
    const {
      projectId,
      freelancerId,
      clientId,
      workLink,
      description
    } = req.body;

    const existing = await Submission.findOne({
      projectId,
      freelancerId
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Work already submitted for this project" });
    }

    // 1️⃣ Create submission
    const submission = await Submission.create({
      projectId,
      freelancerId,
      clientId,
      workLink,
      description,
      status: "submitted"
    });

    // 2️⃣ 🔥 Update Application status
    await Application.findOneAndUpdate(
      { projectId, freelancerId },
      { status: "submitted" }
    );

    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Freelancer views own submissions
 */
exports.getFreelancerSubmissions = async (req, res) => {
  try {
    const subs = await Submission.find({
      freelancerId: req.params.freelancerId
    });

    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Client views submissions for their projects
 */
exports.getClientSubmissions = async (req, res) => {
  try {
    const subs = await Submission.find({
      clientId: req.params.clientId
    });

    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Client accepts or requests revision
 */
exports.updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Admin views all submissions
 */
exports.getAllSubmissions = async (req, res) => {
  try {
    const subs = await Submission.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
