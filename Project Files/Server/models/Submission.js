const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    workLink: String,
    notes: String,
    status: {
      type: String,
      enum: ["submitted", "approved", "revision"],
      default: "submitted"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
