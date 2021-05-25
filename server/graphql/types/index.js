exports.userTypes = `
  type User {
    _id: ID,
    avatar: String
    username: String
    name: String
    email: String
    role: String
  }

  input SignUpInput {
   email:String!
   password:String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
  input UpdateUserInput{
    email:String!
  }
`;

exports.gameTypes = `

type Game{
  _id:ID
  home_team:String!
  away_team:String!
  time_start:String!
  location:String
  referee:String
  added_by:ID
}
  input GameInput{
    home_team:String!
    away_team:String!
    time_start:String!
    location:String
    referee:String
  }
type Event{
  _id:ID
  eventType:String!
  team:String!
  time:String!
  text:String
  added_by:ID
  game_id:ID
}
input EventInput{
  eventType:String!
  team:String!
  time:String!
  text:String
}
input EventUpdateInput{
  eventType:String
  team:String
  time:String
  text:String
}
`;
