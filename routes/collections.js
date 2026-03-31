import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Collection from "../models/Collections.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const newCollection = new Collection({
      name,
      owner: req.user.id,
    });

    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const collections = await Collection.find({ owner: req.user.id });
    res.json(collections);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.json(collection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { name },
      { new: true, runValidators: true },
    );

    if (!updatedCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.json(updatedCollection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedCollection = await Collection.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deletedCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.json({ message: "Collection deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
