const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bio: {
      type: String
    },
    skills: [String],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ],
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Freelancer", freelancerSchema);
