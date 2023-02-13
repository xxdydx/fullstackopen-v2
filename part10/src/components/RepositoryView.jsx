import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { FlatList, View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import { Button } from "react-native-web";
import { Linking } from "react-native";
import theme from "../theme";

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
  reviewContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  reviewRating: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewTextContainer: {
    display: "flex",
    paddingLeft: 20,
    flexDirection: "column",
    width: "85%",
    backgroundColor: "white",
  },
  separator: {
    height: 10,
    backgroundColor: "#d1d1cf",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  buttonContainer: {
    padding: 15,
  },
  separator: {
    height: 10,
    backgroundColor: "#d1d1cf",
  },
});

const formatNumber = (num) => {
  if (num >= 1000) {
    return `${Math.round((num / 1000) * 10) / 10}k`;
  } else {
    return num;
  }
};
const RepoViewHeader = ({ repositories }) => {
  return (
    <View key={repositories.id} style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: repositories.ownerAvatarUrl }}
        />

        <View style={styles.topTextContainer}>
          <Text fontSize="subheading" fontWeight="bold">
            {repositories.fullName}
          </Text>
          <Text>{repositories.description}</Text>
          <Text fontWeight="bold" color="primary">
            {repositories.language}
          </Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomStatsContainer}>
          <Text fontWeight="bold">
            {formatNumber(repositories.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.bottomStatsContainer}>
          <Text fontWeight="bold">{formatNumber(repositories.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.bottomStatsContainer}>
          <Text fontWeight="bold">
            {formatNumber(repositories.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.bottomStatsContainer}>
          <Text fontWeight="bold">
            {formatNumber(repositories.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => Linking.openURL(repositories.url)}
          title="Open in Github"
        ></Button>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const Reviews = ({ review }) => {
  if (review === undefined) {
    return null;
  }

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRating}>
        <Text fontSize="subheading" color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>

      <View style={styles.reviewTextContainer}>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text>
          {new Date(review.createdAt).toLocaleString("en-SG").slice(0, 10)}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { id } = useParams();
  const { loading, repositories } = useRepository(id);
  const reviews = repositories.reviews
    ? repositories.reviews.edges.map((edge) => edge.node)
    : [];
  console.log(reviews);

  if (loading === true) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <Reviews review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepoViewHeader repositories={repositories} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryView;
