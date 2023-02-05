import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date
  type Mutation {
    createConversation(participantIds: [String]): CreateConversationResponse
  }
  type CreateConversationResponse {
    conversationId: String
  }
  type Conversation {
    id: String
    latestMessage: Message
    participants: [Participant]
    createdAt: Date
    updatedAt: Date
  }
  type Participant {
    id: String
    user: User
    seenStatus: Boolean
  }
  type Query {
    conversations: [Conversation]
  }
`;
export default typeDefs;
