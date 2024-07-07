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

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($conversationId: String!) {
    getMessages(conversationId: $conversationId) {
      id
      content
      user {
        username
      }
    }
  }
`;
