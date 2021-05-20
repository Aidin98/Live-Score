const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;


const eventSchema=new Schema({
  type:{
    enum:['haftime_start','halftime_end','goal','yellow_card','red_card','substitution','foul','game_end'],
    type:String
  },
  team:{
    enum:['home','away','global'],
    time:{
      type:Date,
      default:new Date()
    },
    text:{
      type:String
    },
    added_by:{
      type: Schema.Types.ObjectId,
    ref: "User"
    },
    game_id:{
      type:Schema.Types.ObjectId,
      ref:"Game"
    }
  }
})
