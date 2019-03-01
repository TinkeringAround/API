const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  meta: {
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      require: true
    },
    servePuzzlesDaily: { type: boolean, require: true },
    startData: { type: Date, require: true }
  },
  levels: {
    type: [
      [
        {
          type: { type: String, required: true },
          task: { type: String },
          help: { type: String, require: true },
          solution: { type: String, required: true },
          hint: { type: String }
        }
      ]
    ],
    required: true
  }
});

module.exports = mongoose.model("Game", gameSchema);
