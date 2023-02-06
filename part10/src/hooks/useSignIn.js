import { gql, useMutation } from "@apollo/client";
import AuthStorage from "../utils/AuthStorage";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { useContext } from "react";
import { useApolloClient } from "@apollo/client";

const LOGIN = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error),
  });
  const apolloClient = useApolloClient();

  const signIn = async ({ Username, Password }) => {
    const username = Username;
    const password = Password;
    const results = await mutate({
      variables: { username, password },
    });
    await authStorage.setAccessToken(results.data.authenticate.accessToken);
    apolloClient.resetStore();
    return results;
  };

  return [signIn, result];
};

export default useSignIn;
