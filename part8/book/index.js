const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { resolveGraphqlOptions } = require("apollo-server-core");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    findBook(title: String!): Book
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books;
      }

      if (args.author) {
        return books.filter((b) => b.author === args.author);
      }
      if (args.genre) {
        return books.filter((b) => b.genres.includes(args.genre));
      }
    },
    findBook: () => (root, args) => books.find((b) => b.title === args.title),
    authorCount: () => authors.length,
    allAuthors: () => {
      return authors;
    },

    findAuthor: () => (root, args) => authors.find((a) => a.name === args.name),
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres,
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: (root) => {
      const countBooks = books.filter((b) => b.author === root.name);
      return countBooks.length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      console.log(args);
      const checkAuthor = authors.filter((a) => a.name.includes(args.author));
      console.log("search", checkAuthor);
      const newBook = { ...args };
      console.log(newBook);
      if (checkAuthor[0]) {
        books.push(newBook);
        return newBook;
      } else {
        authors.push({ name: args.author });
        books.push(newBook);
        console.log(books);
        console.log(authors);
        return newBook;
      }
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      console.log(author)
      if (!author) {
        return null;
      }
      const updateAuthor = { ...author, born: args.setBornTo };
      console.log(updateAuthor)
      authors.map(a => a.name === args.name ? updateAuthor : a);
      console.log("authors:", authors);
      return updateAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
