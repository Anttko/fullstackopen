const User = require("./models/User");
const Book = require("./models/Book");
const Author = require("./models/Author");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
    meFavoriteBooks: async (root, args, context) => {
      const genre = context.currentUser.favoriteGenre;
      const findByGenre = await Book.find({ genres: genre }).populate("author");
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
      console.log("currentUSer", currentUser);
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
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
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
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]) },
  },
};

module.exports = resolvers;
