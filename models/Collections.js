import mongoose from "mongoose";
import Card from "./Cards.js";

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

collectionSchema.pre("findOneAndDelete", async function (next) {
  const collectionId = this.getQuery()._id;
  await Card.deleteMany({ collection: collectionId });
  next();
});

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
