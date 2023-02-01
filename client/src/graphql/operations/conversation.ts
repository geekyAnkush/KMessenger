import { gql } from "@apollo/client";

const ConversationOperations = {
  Queries: {},
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
