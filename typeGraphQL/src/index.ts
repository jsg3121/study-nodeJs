import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import { RegisterResolver } from "./resolver/resolver";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const server = new ApolloServer({
    schema
  });
  const app = express();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, (): void => console.log("server start"));
};

main();





