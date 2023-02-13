import { gql, useMutation, useApolloClient } from "@apollo/client";

const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput) {
    createReview(review: $input) {
      repositoryId
    }
  }
`;
const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ ownername, reponame, rating, review }) => {
    const results = await mutate({
      variables: {
        input: {
          repositoryName: reponame,
          ownerName: ownername,
          rating: parseInt(rating),
          text: review,
        },
      },
    });
    apolloClient.resetStore();
    return results;
  };

  return [createReview, result];
};

export default useReview;
