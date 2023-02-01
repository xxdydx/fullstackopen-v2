import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

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

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await useQuery(ALL_REPOSITORIES);
    const json = await response.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
