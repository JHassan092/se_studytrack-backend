import express from "express";

import Card from "../models/Cards.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { question, answer, collection } = req.body;

    const newCard = new Card({
      question,
      answer,
      collection,
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const cards = await Card.find({ owner: req.user.id });
    res.json(cards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
