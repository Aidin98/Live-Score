const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;


const gameSchema = new Schema({
  home_team: {
    type: String,
    required: "Home Team is required",
  },
  away_team: {
    type: String,
    required: "Away Team  is required",
  },
  time_start: {
    type: Date,
    required: "Match Time is required",
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
  currentTime:{
    type:Date,
    required:true
  }
});


module.exports = mongoose.model("Game", gameSchema);
