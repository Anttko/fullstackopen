import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from "../queries";


const Authors = (props) => {

  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const [editYear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const authors = props.authors;

  const submit = async (event) => {
    event.preventDefault();
    console.log('submit author:', author)
    editYear({ variables: { author, year: Number(year) } });
    setAuthor("");
    setYear("");
    
  };
  const style = {
    backgroundColor: "white"
  }
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log(result.data);
      props.msg("person not found");
    }
  }, [result.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }
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
          <select value={author} onChange={({ target }) => setAuthor(target.value)}>
            {authors.map((a) => [
              <option value={a.name} key={a.name}>
                {a.name}
              </option>,
            ])}
          </select>
          <br />
          born
          <input
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />
          <button style={style}>edit</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
