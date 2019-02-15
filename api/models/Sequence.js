const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  meta: {
    author: { type: String, required: true },
    createdAt: { type: String, require: true },
    updatedAt: { type: String, require: true },
    tags: [String]
  },
  properties: {
    serveBlocksDaily: { type: Boolean, require: true, default: false }
  },
  sequence: [[{ type: mongoose.SchemaTypes.ObjectId, ref: "Puzzle" }]]
});

module.exports = mongoose.model("Sequence", sequenceSchema);
