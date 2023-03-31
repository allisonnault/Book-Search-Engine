const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    _id: ID
    authors: [String]
    descritpion: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}
type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    user(_id: ID!): User
    me: User
}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, book_id: ID!): User
    deleteBook(userId: ID!, book_id: ID!): User
}`

module.exports = typeDefs;