import userResolvers from "./user";
import conversationResolvers from "./conversation";
import merge from "lodash.merge";
const resolvers = merge({}, userResolvers, conversationResolvers);
export default resolvers;
