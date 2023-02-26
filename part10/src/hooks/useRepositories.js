import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
const ALL_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        cursor
        node {
          description
          ownerAvatarUrl
          stargazersCount
          reviewCount
          ratingAverage
          language
          id
          fullName
          forksCount
        }
      }
    }
  }
`;

const useRepositories = (orderBy, orderDir) => {
  const response = useQuery(ALL_REPOSITORIES, {
    variables: { orderBy: orderBy, orderDirection: orderDir },
  });

  return {
    repositories: response.data ? response.data.repositories : [],
    loading: response.loading,
  };
};

export default useRepositories;
