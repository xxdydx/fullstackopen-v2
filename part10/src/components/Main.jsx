import Constants from "expo-constants";
import { Text, View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import { useMatch, useParams } from "react-router-native";

import RepositoryList from "./RepositoryList";
import theme from "../theme";
import SignIn from "./SignIn";
import RepositoryView from "./RepositoryView";
import ReviewForm from "./ReviewForm";
import SignUp from "./SignUp";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/repositories/:id" element={<RepositoryView />} exact />
        <Route path="/create" element={<ReviewForm />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={<SignUp />} exact />
      </Routes>
    </View>
  );
};

export default Main;
