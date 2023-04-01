import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($userId: ID!, $bookId: ID!) {
  saveBook(userId: $userId, book_id: $bookId) {
    _id
    savedBooks {
      _id
      title
    }
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($userId: ID!, $bookId: ID!) {
  deleteBook(userId: $userId, book_id: $bookId) {
    _id
    savedBooks {
      _id
      title
    }
  }
}
`