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

router.get("/", authMiddleware, async (req, res) => {
  try {
    const cards = await Card.find({
      collection: req.params.id,
      owner: req.user.id,
    });
    res.json(cards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { question, answer } = req.body;

    const updatedCard = await Card.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { question, answer },
      { new: true, runValidators: true },
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deletedCard) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
