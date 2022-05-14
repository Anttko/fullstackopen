import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Favorites from "./components/Favorites";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}> {errorMessage} </div>;
};

const App = () => {
  const [page, setPage] = useState("books");
  const [errorMessage, setErrorMessage] = useState(null);
  const queryAuthors = useQuery(ALL_AUTHORS);
  const queryBooks = useQuery(ALL_BOOKS);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  if (queryAuthors.loading || queryBooks.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("favorites")}>recommendations</button>
        ) : null}
        {token ? <button onClick={() => logout()}>logout</button> : null}

        {token ? null : <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors
        authors={queryAuthors.data.allAuthors}
        show={page === "authors"}
        msg={notify}
      />
      <LoginForm
        show={page === "login"}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />
      <Favorites show={page === "favorites"} token={token} />
      <Books books={queryBooks.data.allBooks} show={page === "books"} />

      {token ? <NewBook msg={notify} show={page === "add"} /> : ""}
    </div>
  );
};

export default App;
