import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
      born
      bookCount
      id
    }
    published
    genres
  }
`;
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

export const FAVORITE = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
export const USER_FAV_GENRE = gql`
  query {
    meFavoriteBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

export const GENRE_SEARCH = gql`
  query searchGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editYear($author: String!, $year: Int!) {
    editAuthor(name: $author, setBornTo: $year) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
