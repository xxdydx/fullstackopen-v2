import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      bookCount
      born
      name
    }
  }
`;

const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      author {
        id
        name
        born
        bookCount
      }
      genres
      published
      title
      id
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const authorResult = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });
  const bookResult = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });

  if (authorResult.loading || bookResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={authorResult.data.allAuthors}
      />

      <Books show={page === "books"} books={bookResult.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
