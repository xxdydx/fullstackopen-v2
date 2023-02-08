import { gql, useQuery } from "@apollo/client";
const ALL_REPOSITORIES = gql`
  query Repository($id: String!) {
    repository(id: $id) {
      id
      fullName
      url
    }
  }
`;

const useRepository = async ({ id }) => {
  const [func] = useQuery(ALL_REPOSITORIES, { variables });
  const response = await func({ variables: { id } });
  console.log(response);

  return {
    repositories: response.data ? response.data.repository : [],
    loading: response.loading,
  };
};

export default useRepository;
