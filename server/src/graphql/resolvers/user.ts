import { CreateUsernameResponse, GraphQLContext } from "../../utils/types";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ) => {
      try {
        const { username: searchedUsername } = args;
        const { session, prisma } = context;

        if (!session?.user) {
          throw new GraphQLError("Not Authorized");
        }
        const {
          user: { username: loggedUser },
        } = session;
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: loggedUser,
              mode: "insensitive",
            },
          },
        });
        return users;
      } catch (error: any) {
        console.log("Search user error --> ", error);
        throw new GraphQLError(error?.message);
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { prisma, session } = context;

      if (!session?.user) {
        return { error: "Not authorized" };
      }
      const { id: userId } = session.user;
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });
        if (existingUser) {
          return {
            error: "Username already taken Please try another name",
          };
        }
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });
        return { success: true };
      } catch (error: any) {
        console.log("Create username error --> ", error);
        return { error: error?.message };
      }
    },
  },
  // Subscription: {},
};

export default resolvers;
//
