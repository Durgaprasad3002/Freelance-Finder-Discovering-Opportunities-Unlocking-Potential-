const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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
  rating: Number,
  feedback: String
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
