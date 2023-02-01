import Main from "./src/components/Main";
import RepositoryList from "./src/components/RepositoryList";
import { StatusBar } from "expo-status-bar";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";

const App = () => {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={ApolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
