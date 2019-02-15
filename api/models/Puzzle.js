const mongoose = require("mongoose");

const puzzleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  type: { type: String, require: true },
  meta: {
    author: { type: String, required: true },
    createdAt: { type: String, require: true },
    updatedAt: { type: String, require: true },
    tags: [String]
  },
  content: {
    task: { type: String, require: true },
    clue: { type: String },
    solution: [String],
    media: { type: String },
    puzzle: [String],
    data: Object
  }
});

module.exports = mongoose.model("Puzzle", puzzleSchema);
