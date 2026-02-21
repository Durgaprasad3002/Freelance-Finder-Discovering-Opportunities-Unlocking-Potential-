const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    budget: Number,

    // ✅ ADD THIS
    skills: {
      type: [String],
      default: []
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: ["open", "assigned", "working", "submitted", "completed"],
      default: "open"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
