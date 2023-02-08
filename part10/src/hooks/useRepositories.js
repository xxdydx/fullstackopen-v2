import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
const ALL_REPOSITORIES = gql`
  query Repositories {
    repositories {
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

const useRepositories = () => {
  const response = useQuery(ALL_REPOSITORIES);

  return {
    repositories: response.data ? response.data.repositories : [],
    loading: response.loading,
  };
};

export default useRepositories;
