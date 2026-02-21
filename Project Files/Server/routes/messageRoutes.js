const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* ---------- GET CHAT HISTORY ---------- */
router.get("/:clientId/:freelancerId", async (req, res) => {
  try {
    const messages = await Message.find({
      clientId: req.params.clientId,
      freelancerId: req.params.freelancerId
    })
      .populate("senderId", "name role")   // 🔥 THIS LINE FIXES IT
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
