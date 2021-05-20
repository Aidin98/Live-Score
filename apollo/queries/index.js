import { gql } from "apollo-boost";
//user starts


export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
     email
     role
    }
  }
`;
export const SIGN_UP = gql`
  mutation SignUp(

    $email: String!
    $password: String!

  ) {
    signUp(
      input: {

        email: $email
        password: $password

      }
    )
  }
`;
export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;
export const GET_USER = gql`
  query User {
    user {
      _id
      email
      role
    }
  }
`;

//userEnds
