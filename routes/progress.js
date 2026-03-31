import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import Progress from "../models/Progress.js";

const router = express.Router();

router.post("/:cardId", authMiddleware, async (req, res) => {
  try {
    const { correct } = req.body;

    let progress = await Progress.findOne({
      card: req.params.cardId,
      user: req.user.id,
    });

    if (!progress) {
      progress = new Progress({
        card: req.params.cardId,
        user: req.user.id,
        attempts: 0,
        correct: 0,
        incorrect: 0,
      });
    }

    progress.attempts += 1;
    if (correct) progress.correct += 1;
    progress.lastReviewed = Date.now();

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id }).populate(
      "card",
    );
    res.json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
