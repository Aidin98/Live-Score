import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { ADD_GAME,DELETE_USER, GET_ALL_USERS, GET_GAMES, GET_USER, SIGN_IN, SIGN_OUT, SIGN_UP, UPDATE_USER } from "../queries";
//User Starts

export const useSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn: signedInUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: signedInUser },
      });
    },
  });
  export const useSignUp = () =>
    useMutation(SIGN_UP, {
      update(cache, { data: { signIn: signedInUser } }) {
        cache.writeQuery({
          query:GET_USER,
          data:{user:signedInUser}
        })
      },
    });
    export const useSignOut = () => useMutation(SIGN_OUT);
  export const useGetUser = () => useQuery(GET_USER);
  export const useLazyGetUser = () => useLazyQuery(GET_USER);
  export const useGetAllUsers=()=>useQuery(GET_ALL_USERS)
export const useUpdateUSer=()=>useMutation(UPDATE_USER)
export const useDeleteUser = () =>
  useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const { users } = cache.readQuery({
        query: GET_ALL_USERS,
      });

      const newUSers = users.filter(
        (p) => p._id !== deleteUser
      );
      cache.writeQuery({
        query: GET_ALL_USERS,
        data: { users : newUSers },
      });
    },
  });
//User Ends


//game starts
export const useCreateGame = () =>
  useMutation(ADD_GAME, {
    update(cache, { data: { createGame } }) {
      console.log('podaci za kreaciju su ',createGame)
      const { games } = cache.readQuery({ query: GET_GAMES });
      console.log('prijasnji podaci su',games)
      const newGames=[...games,createGame]
      cache.writeQuery({
        query: GET_GAMES,
        data: {games:newGames},
      });
      console.log('updateovani podaci si',games)
    },
  });

export const useGetGames=()=>useQuery(GET_GAMES)


//game ends


