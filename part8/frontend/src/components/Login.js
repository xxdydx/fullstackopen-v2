import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error.graphQLErrors[0].message),
  });
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]); // eslint-disable-line
  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };
  if (!props.show) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          value={password}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
};
export default Login;
