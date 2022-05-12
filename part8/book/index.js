const Book = require("./models/Book");
const Author = require("./models/Author");
const config = require("./utils/config");

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
        return await Book.find({}).populate("author");
      }
      if (args.author) {
        return Book.find({ author: { $elemMatch: { name: args.author } } });
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
      const checkAuthor = await Author.findOne({
        name: { $exists: true, $eq: args.author },
      });
      let authorToAdd = checkAuthor;
      console.log("===============", checkAuthor);

      if (!checkAuthor) {
        const newAuthor = new Author({ name: args.author });
        console.log("123", newAuthor);
        try {
          authorToAdd = await newAuthor.save();
          console.log("save", authorToAdd);
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      console.log("new author", authorToAdd);

      const newBook = new Book({ ...args, author: authorToAdd });
      console.log(newBook);
      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return newBook;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
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