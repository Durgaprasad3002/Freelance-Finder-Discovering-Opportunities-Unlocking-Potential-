const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderRole: { type: String, enum: ["client", "freelancer"] },
    message: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
