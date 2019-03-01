const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  meta: {
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      require: true
    },
    completed: { type: boolean, required: true }
  },
  game: { type: mongoose.SchemaTypes.ObjectId, ref: "Game", require: true },
  achievements: { type: [[String]], required: true }
});

module.exports = mongoose.model("Activity", activitySchema);
