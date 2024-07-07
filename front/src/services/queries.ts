import { gql } from '@apollo/client';

export const GET_CONVERSATIONS = gql`
  query GetConversations($username: String!) {
    getConversations(username: $username) {
      id
      users {
        username
      }
      messages {
        id
        content
        user {
          username
        }
      }
    }
  }
`;
