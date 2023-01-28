import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";
import * as dotenv from "dotenv";
import { GraphQLContext } from "./src/utils/types";

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);

dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};

const prisma = new PrismaClient();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
  try {
    await server.start();
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve)
    );
    app.use(
      "/graphql",
      cors<cors.CorsRequest>(corsOptions),
      json(),
      expressMiddleware(server, {
        context: async ({ req }): Promise<GraphQLContext> => {
          const session = await getSession({ req });
          return { session, prisma };
        },
      })
    );
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  } catch (error) {
    console.log("error -> ", error);
  }
};
startServer();
