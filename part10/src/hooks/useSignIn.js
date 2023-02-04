import { gql, useMutation } from "@apollo/client";
const LOGIN = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error),
  });

  const signIn = async ({ Username, Password }) => {
    const username = Username;
    const password = Password;
    const results = await mutate({
      variables: { username, password },
    });
    console.log(results);
    return results;
  };

  return [signIn, result];
};

export default useSignIn;
