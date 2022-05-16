import { useState, useEffect } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_GENRES, GENRE_SEARCH } from "../queries";

const style = {
  marginRight: 4,
};

const Books = (props) => {
  let books = props.books;
  const queryGenres = useQuery(ALL_GENRES);
  const [genre, setGenre] = useState(null);

  const result = useQuery(GENRE_SEARCH, {
    variables: { genre },
    skip: !genre,
  });
  console.log("", result);
  if (!props.show) {
    return null;
  }

  if (genre && result.data) {
    books = result.data.allBooks;
    console.log(result.data.allBooks);
  }
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div>Selected genre {genre}</div>
        {queryGenres.loading ? (
          <div>loading genres...</div>
        ) : (
          queryGenres.data.allGenres.map((a) => {
            return (
              <button
                value={a}
                style={style}
                key={a}
                onClick={({ target }) => setGenre(target.value)}
              >
                {a}
              </button>
            );
          })
        )}
        <button onClick={() => setGenre(null)}>show all books</button>
      </div>
    </div>
  );
};

export default Books;
