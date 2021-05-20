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
`;
