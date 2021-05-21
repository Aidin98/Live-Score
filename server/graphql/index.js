const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const {userMutations,userQueries, gameMutatuions, gameQueries} = require("./resolvers");
const {userTypes, gameTypes} = require("./types");
const { buildAuthContext } = require("./context");

const User = require("./models/User");
const Game=require('./models/Game')
exports.createApolloServer = () => {

  const typeDefs = gql(`

  ${userTypes}
  ${gameTypes}
  type Query {
    user: User
    users:[User]
    games:[Game]
  }

  type Mutation {
    signUp(input: SignUpInput): String
    signIn(input: SignInInput): User
    signOut: Boolean
    updateUser(id:ID,input:UpdateUserInput):User
    deleteUser(id:ID):ID
    createGame(input:GameInput):Game

  }`);


  const resolvers = {
    Query: {
      ...userQueries,
      ...gameQueries
    },
    Mutation: {
      ...userMutations,
      ...gameMutatuions
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        User: new User(mongoose.model("User")),
        Game:new Game(mongoose.model('Game'),req.user)
      },
    }),
  });

  return apolloServer;
};
