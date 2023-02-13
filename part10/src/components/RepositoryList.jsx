import { FlatList, View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import { Button, TouchableHighlight, TouchableOpacity } from "react-native-web";
import useRepositories from "../hooks/useRepositories";
import { Linking } from "react-native";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  topTextContainer: {
    display: "flex",
    paddingLeft: 10,
    flexDirection: "column",
    width: "85%",
    backgroundColor: "white",
  },
  bottomContainer: {
    display: "flex",
    padding: 15,
    flexDirection: "row",
  },
  bottomStatsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
  },
  separator: {
    height: 10,
    backgroundColor: "#d1d1cf",
  },
  avatar: {
    width: 50,
    height: 50,
  },
});

const formatNumber = (num) => {
  if (num >= 1000) {
    return `${Math.round((num / 1000) * 10) / 10}k`;
  } else {
    return num;
  }
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading } = useRepositories();
  const navigate = useNavigate();
  if (loading === true) {
    return <Text>Loading...</Text>;
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (
        <TouchableOpacity onPress={() => navigate(`/repositories/${item.id}`)}>
          <View key={item.id} style={styles.container}>
            <View style={styles.topContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: item.ownerAvatarUrl }}
              />

              <View style={styles.topTextContainer}>
                <Text fontSize="subheading" fontWeight="bold">
                  {item.fullName}
                </Text>
                <Text>{item.description}</Text>
                <Text fontWeight="bold" color="primary">
                  {item.language}
                </Text>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <View style={styles.bottomStatsContainer}>
                <Text fontWeight="bold">
                  {formatNumber(item.stargazersCount)}
                </Text>
                <Text>Stars</Text>
              </View>
              <View style={styles.bottomStatsContainer}>
                <Text fontWeight="bold">{formatNumber(item.forksCount)}</Text>
                <Text>Forks</Text>
              </View>
              <View style={styles.bottomStatsContainer}>
                <Text fontWeight="bold">{formatNumber(item.reviewCount)}</Text>
                <Text>Reviews</Text>
              </View>
              <View style={styles.bottomStatsContainer}>
                <Text fontWeight="bold">
                  {formatNumber(item.ratingAverage)}
                </Text>
                <Text>Rating</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default RepositoryList;
