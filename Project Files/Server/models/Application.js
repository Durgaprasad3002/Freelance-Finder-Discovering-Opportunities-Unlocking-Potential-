const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    proposal: String,
    bidAmount: Number,
    status: {
  type: String,
  enum: ["pending", "accepted", "submitted", "completed", "rejected"],
  default: "pending"
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
