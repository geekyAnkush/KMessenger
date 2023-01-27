import userResolvers from "./user";
import merge from "lodash.merge";
const resolvers = merge({}, userResolvers);
export default resolvers;
