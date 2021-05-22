const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { DB_URI } = require("../config/dev");

require("./models/games");
require("./models/user");
require('./models/event')
exports.connect = () => {
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => {
      console.log("Connected to DB");
    }
  );
};

exports.initSessionStore = () => {
  const store = new MongoDBStore({
    uri: DB_URI,
    collection: "userSession",
  });

  return store;
};
