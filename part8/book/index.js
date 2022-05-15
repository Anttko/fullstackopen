const Book = require("./models/Book");
const Author = require("./models/Author");
const config = require("./utils/config");
const User = require("./models/User");
const mongoose = require("mongoose");
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";
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
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    findBook(title: String!): Book
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    me: User
    meFavoriteBooks: [Book!]!
    allGenres: [String!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate("author");
      }
      console.log("args: ", args);
      if (args.author) {
        const findAuthor = await Author.find({ name: args.author });
        console.log("author", findAuthor[0]._id);
        const findByAuthor = await Book.find({
          author: findAuthor[0]._id,
        }).populate("author");

        console.log(findByAuthor);

        return findByAuthor;
      }
      if (args.genre) {
        const findByGenre = await Book.find({ genres: args.genre }).populate(
          "author"
        );
        return findByGenre;
      }
    },
    findBook: async (root, args) => Book.findOne({ title: args.name }),
    authorCount: async () => Author.collection.countDocuments,
    allAuthors: async () => {
      return Author.find({});
    },
    findAuthor: async (root, args) => Author.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser;
    },
    meFavoriteBooks : async (root, args, context) => {
      const genre = context.currentUser.favoriteGenre
      const findByGenre = await Book.find({ genres: genre }).populate(
        "author"
      );
      return findByGenre;

    },
    allGenres: async () => {
      const books = await Book.find({});
      console.log("finder", books);
      let findAllGenres = [
        ...new Set(books.reduce((a, b) => a.concat(b.genres), [])),
      ];
      console.log("a", findAllGenres);

      return findAllGenres;
    },
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
    bookCount: async (root) => {
      const findAuthor = await Author.find({ name: root.name });

      const count = await Book.find({
        author: findAuthor[0]._id,
      }).countDocuments();
      return count;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(args);
      const currentUser = context.currentUser;
      console.log('currentUSer', currentUser)
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
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
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
