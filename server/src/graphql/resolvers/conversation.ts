import { GraphQLContext } from "../../utils/types";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";
const resolvers = {
  Query: {
    conversations: async (_: any, __: any, context: GraphQLContext) => {
      try {
        const { prisma, session } = context;
        if (!session?.user) {
          throw new GraphQLError("Not Authorized");
        }
        const {
          user: { id: userId },
        } = session;
        const conversations = await prisma.conversation.findMany({
          include: consversationPopulated,
        });
      } catch (error: any) {
        console.log("conversations query error --> ", error?.message);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      try {
        const { prisma, session } = context;
        const { participantIds } = args;
        if (!session?.user) {
          throw new GraphQLError("Not Authorized");
        }
        const {
          user: { id: userId },
        } = session;
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((id) => ({
                  userId: id,
                  seenStatus: id === userId,
                })),
              },
            },
          },
          include: conversationPopulated,
        });
        return {
          conversationId: conversation.id,
        };
      } catch (error: any) {
        console.log("create conversation resolver error --> ", error?.message);
        throw new GraphQLError("Error creating conversation");
      }
    },
  },
};
export default resolvers;

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    },
  });
