import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const EDIT_AUTHOR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      name
    }
  }
`;

const Authors = ({ show, authors }) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR);
  if (!show) {
    return null;
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const submit = async (event) => {
    event.preventDefault();
    var setBornTo = parseInt(year);
    await editAuthor({ variables: { name, setBornTo } });

    console.log("edit author...");

    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>set author birthyear</h2>
        <form onSubmit={submit}>
          <select value={name} onChange={handleNameChange}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>

          <div>
            birth year
            <input
              type="number"
              value={year}
              onChange={({ target }) => setYear(target.value)}
            />
          </div>

          <button type="submit">create book</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
