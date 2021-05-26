const mongoose=require("mongoose")
const user1Id=mongoose.Types.ObjectId()
const user2Id=mongoose.Types.ObjectId()
const gameId=mongoose.Types.ObjectId()
const data = {
  users: [
    {
      _id: user1Id,
      email: "aidin@gmail.com",
      password: "123123",
      role: "admin",
    },
    {
      _id: user2Id,
      email: "guest@gmail.com",
      password: "123123",
      role: "regular",
    },
  ],
  games: [
    {
      _id: gameId,
      home_team: "Mancheter United",
      away_team: "Liverpool",
      time_start: "10/10/2010",
      location: "Manchester",
      referee: "Andre Marriner",
      added_by: user1Id,
    },
  ],
  events: [
    {
      eventType: "goal",
      team: "home",
      time: "10/10/2010",
      text: "Mancheter United scored a goal",
      added_by: user1Id,
      game_id: gameId,
    },
    {
      eventType: "yellow_card",
      team: "home",
      time: "10/10/2010",
      text: "Yellow card for a Mancheter United player.",
      added_by: user1Id,
      game_id: gameId,
    },
    {
      eventType: "halftime_start",
      team: "global",
      time: "10/10/2010",
      text: "The halftime starts",
      added_by: user1Id,
      game_id: gameId,
    },
    {
      eventType: "game_end",
      team: "global",
      time: "10/10/2010",
      text: "Game ends",
      added_by: user1Id,
      game_id: gameId,
    },
  ],
};
module.exports = data;
