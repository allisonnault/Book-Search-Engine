import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query Users {
    users {
      _id
      username
    }
  }
`;

// export const QUERY_USER = gql`
// user(_id: $id) {
//     _id
//     email
//     username
//     savedBooks {
//       _id
//       title
//       link
//       image
//       descritpion
//       bookId
//       authors
//     }
//   }
// }
// `;

export const QUERY_ME = gql`
query Me {
    me {
      _id
      username
      email
      savedBooks {
        _id
        title
        link
        image
        descritpion
        bookId
        authors
      }
    }
  }
`;



