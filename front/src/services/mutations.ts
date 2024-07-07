import { gql } from '@apollo/client';

export const START_CONVERSATION = gql`
  mutation StartConversation($username1: String!, $username2: String!) {
    createConversation(username1: $username1, username2: $username2) {
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

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($content: String!, $conversationId: String!) {
    createMessage(content: $content, conversationId: $conversationId) {
      id
      content
      user {
        username
      }
    }
  }
`;
