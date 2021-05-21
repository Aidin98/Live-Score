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

export const GET_ALL_USERS=gql`
query Users{
  users{
    _id
    email
    role
  }
}
`
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID
  $email:String!
  ) {
    updateUser(
      id: $id
      input: {
       email:$email
      }
    ) {
        email
        role
        _id
    }
  }
`;

export const DELETE_USER=gql`
mutation DeleteUser($id:ID){
  deleteUser(id:$id)
}
`

//userEnds


//gamestarts
export const ADD_GAME = gql`
  mutation CreateGame(

    $home_team:String!
      $away_team:String	!
      $time_start:String!
      $location:String
      $referee:String

  ) {
    createGame(
      input: {

        home_team: $home_team
        away_team: $away_team
        time_start: $time_start
        location: $location
        referee: $referee
      }
    )
    {
          home_team
      away_team
      time_start
      location
      time_start
    }
  }
`;

export const GET_GAMES = gql`
  query getGames {
    games {
      _id
      home_team
      away_team
      location
      referee
      time_start
    }
  }
`;
//gameends



