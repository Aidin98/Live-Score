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

exports.gameTypes=`

type Game{
  _id:ID
  home_team:String!
  away_team:String!
  time_start:String!
  location:String
  referee:String
  
}
  input GameInput{
    home_team:String!
    away_team:String!
    time_start:String!
    location:String
    referee:String
  }

`
