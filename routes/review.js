import express from "express";

import authMiddleware from "../middleware/authMiddleware";
import Card from "../models/Cards.js";

const router = express.Router();

router.get("/:collectionId", authMiddleware, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const cards = await Card.find({
      collection: req.params.collectionId,
      owner: req.user.id,
    })
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json(cards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
