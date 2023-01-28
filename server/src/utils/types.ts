import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";

// users
interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  emailVerified: boolean;
  name: string;
}
export interface Session {
  user: User;
  expires: ISODateString;
}
export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}
export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub
}
