import Book from "./models/Book";
import Author from "./models/Author";
import config from "./utils/config";
const mongoose = require("mongoose");
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { resolveGraphqlOptions } = require("apollo-server-core");

const MONGODB_URI = config.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
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
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({});
      }
      if (args.author) {
        return Book.findOne({ author: args.author });
      }
      if (args.genre) {
        return Book.findOne({ genres: args.genre });
      }
    },
    findBook: async (root, args) => Book.findOne({ title: args.name }),
    authorCount: async () => Author.collection.countDocuments,
    allAuthors: async () => {
      return Author.find({});
    },

    findAuthor: async (root, args) => Author.findOne({ name: args.name }),
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
      const count = Book.find({ author: root.name }).countDocuments();
      return count;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log(args);
      const checkAuthor = Author.findOne({ name: args.author });

      console.log("search", checkAuthor);
      const newBook = { ...args };
      console.log(newBook);
      if (checkAuthor) {
        const newBook = new Book({ ...args });
        return newBook.save();
      } else {
        const newAuthor = new Author({ ...args.author });
        newAuthor.save();
        const newBook = new Book({ ...args });
        console.log(newAuthor);
        console.log(newBook);
        return newBook.save();
      }
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      console.log(author);
      if (!author) {
        return null;
      }
      const updateAuthor = { ...author, born: args.setBornTo };
      console.log(updateAuthor);
      authors.map((a) => (a.name === args.name ? updateAuthor : a));
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
