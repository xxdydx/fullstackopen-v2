import { gql, useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

const SIGNUP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;
const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    const results = await mutate({
      variables: { user: { username: username, password: password } },
    });

    apolloClient.resetStore();
    return results;
  };

  return [signUp, result];
};

export default useSignUp;
