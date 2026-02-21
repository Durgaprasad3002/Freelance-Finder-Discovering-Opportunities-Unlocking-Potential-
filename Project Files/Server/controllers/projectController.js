const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const { clientId, skills } = req.body;

    const user = await User.findById(clientId);

    if (!user || user.role !== "client") {
      return res.status(403).json({ message: "Only clients allowed" });
    }

    const project = await Project.create({
      ...req.body,
      skills: skills || [] // ✅ ensure skills saved
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllProjects = async (req, res) => {
  res.json(await Project.find());
};

exports.getClientProjects = async (req, res) => {
  res.json(await Project.find({ clientId: req.params.clientId }));
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
