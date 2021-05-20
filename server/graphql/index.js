const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

const {userMutations,userQueries} = require("./resolvers");
const {userTypes} = require("./types");
const { buildAuthContext } = require("./context");

const User = require("./models/User");

exports.createApolloServer = () => {
  // Construct a schema, using GRAPHQL schema language
  const typeDefs = gql(`

  ${userTypes}

  type Query {
    user: User
  }

  type Mutation {
    signUp(input: SignUpInput): String
    signIn(input: SignInInput): User
    signOut: Boolean
  }`);

  // The root provides a resolver for each API endpoint
  const resolvers = {
    Query: {
      ...userQueries
    },
    Mutation: {
      ...userMutations
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        User: new User(mongoose.model("User")),
      },
    }),
  });

  return apolloServer;
};
