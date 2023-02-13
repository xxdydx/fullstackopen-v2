import { gql, useQuery } from "@apollo/client";
const ALL_REPOSITORIES = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      description
      ownerAvatarUrl
      stargazersCount
      reviewCount
      ratingAverage
      language
      forksCount
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

const useRepository = (id) => {
  const response = useQuery(ALL_REPOSITORIES, { variables: { id } });

  return {
    repositories: response.data ? response.data.repository : [],
    loading: response.loading,
  };
};

export default useRepository;
