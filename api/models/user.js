const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  meta: {
    createdAt: { type: String, required: true },
    status: { type: String, required: true },
    code: { type: String, required: true }
  },
  activities: {
    sequences: [
      {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: "Sequence" },
        status: Object
      }
    ],
    puzzles: [
      {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: "Puzzle" },
        status: Object
      }
    ]
  }
});

module.exports = mongoose.model("User", userSchema);
