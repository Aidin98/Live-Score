import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { GET_USER, SIGN_IN, SIGN_OUT, SIGN_UP } from "../queries";
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

//User Ends





