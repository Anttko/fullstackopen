import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

const Authors = (props) => {
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  if (!props.show) {
    return null;
  }
  const authors = props.authors;

  const submit = async (event) => {
    event.preventDefault();

    
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
        <h2>Set birthyear</h2>

        <form onSubmit={submit}>
          name
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          born
          <input
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />
          <button>edit</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
