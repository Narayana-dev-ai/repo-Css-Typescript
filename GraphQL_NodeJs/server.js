const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const app = express();

const authors = [
  { id: 1, name: "J.K.ROwling" },
  { id: 2, name: "J.R.R. Tolkien" },
  { id: 3, name: "Brent Weeks" },
];

const books = [
  { id: 1, name: "1Harry potter and chamber of secrets", authorId: 1 },
  { id: 2, name: "2Harry potter and chamber of secrets", authorId: 1 },
  { id: 3, name: "3Harry potter and chamber of secrets", authorId: 1 },
  { id: 4, name: "4Harry potter and chamber of secrets", authorId: 2 },
  { id: 5, name: "5Harry potter and chamber of secrets", authorId: 2 },
  { id: 6, name: "6Harry potter and chamber of secrets", authorId: 2 },
  { id: 7, name: "7Harry potter and chamber of secrets", authorId: 3 },
  { id: 8, name: "8Harry potter and chamber of secrets", authorId: 3 },
];

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This is about authors",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This the summary of books",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((auth) => auth.id === book.authorId);
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A Single Book",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: "List of Books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of Authors",
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      description: "A Single Author",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => authors.find((auth) => auth.id === args.id),
    },
  }),
});

const rootMutationType = new GraphQLObjectType({
  name: "Mutations",
  description: "Root Mutations",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a Book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
    addAuthor: {
      type: AuthorType,
      description: "Add a Author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const author = {
          id: authors.length + 1,
          name: args.name,
        };
        authors.push(author);
        return author;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server Running"));
