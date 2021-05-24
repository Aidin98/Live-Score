import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { ADD_GAME,ADD_GAME_EVENT,DELETE_EVENT,DELETE_USER, EVENTS_BY_GAMEID, GET_ALL_USERS, GET_GAMES, GET_GAME_BY_ID, GET_USER, SIGN_IN, SIGN_OUT, SIGN_UP, UPDATE_EVENT, UPDATE_USER } from "../queries";
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
 update: (cache, { data: { createGame } }) => {
         const data = cache.readQuery({ query: GET_GAMES });
         data.games = [...data.games, createGame];
         cache.writeQuery({ query: GET_GAMES }, data);
 }
  });

export const useGetGames=()=>useQuery(GET_GAMES)
export const useGetGameById=(options)=>useQuery(GET_GAME_BY_ID,options)
export const useCreateGameEvent = () =>
  useMutation(ADD_GAME_EVENT, {
    update: (cache, { data: { createGameEvent } }) => {
      const data = cache.readQuery({ query: EVENTS_BY_GAMEID });
      data.eventsByGameId = [...data.eventsByGameId, createGameEvent];
      cache.writeQuery({ query: EVENTS_BY_GAMEID }, data);
    },
  });
export const useGetEventsByGameId=(options)=>useQuery(EVENTS_BY_GAMEID,options)
export const useUpdateEvent=(options)=>useMutation(UPDATE_EVENT,options)
export const useDeleteEvent = () =>
  useMutation(DELETE_EVENT, {
       update: (cache,{data:{deleteEvent}}) => {
                const data = cache.readQuery({ query: EVENTS_BY_GAMEID });
                console.log('evenuti su ',...data.eventsByGameId)
                data.eventsByGameId = data.eventsByGameId.filter(
                  (p) => p._id !== deleteEvent
                );
                cache.writeQuery({ query: EVENTS_BY_GAMEID }, data);
              }
            });


//game ends


