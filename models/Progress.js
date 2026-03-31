import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  card: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  attempts: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
  incorrect: { type: Number, default: 0 },
});

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;
