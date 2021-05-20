const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;


const gameSchema = new Schema({
  home_team: {
    type: String,
    required: true,
  },
  away_team: {
    type: String,
    required: true,
  },
  time_start: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  referee: {
    type: String,
  },
  added_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});


module.exports = mongoose.model("Game", gameSchema);
