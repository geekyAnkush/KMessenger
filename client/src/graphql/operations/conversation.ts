import { gql } from "@apollo/client";

const ConversationFields = `
  conversations {
    id
    participants {
      user {
        id
        username
      }
      seenStatus
    }
    latestMessage {
      id
      sender {
        id
        username
      }
      body
      createdAt
    }
    updatedAt
}
`;

const ConversationOperations = {
  Queries: {
    conversations: gql`
      query Conversations {
        ${ConversationFields}
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation createConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscription: {},
};
export default ConversationOperations;
