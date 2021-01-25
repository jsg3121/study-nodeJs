import { ApolloServer } from 'apollo-server-express';
import express from "express";
import { buildSchema, Query, Resolver } from 'type-graphql';
import "reflect-metadata";
import { createConnection } from 'typeorm';

@Resolver()
class HelloResolver {

  @Query(() => {
    return String;
  }, { name: "hello" })

  async hello() {
    return "hello world";
  }
}

const main = async () => {

  await createConnection();

  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });

  const apolloServer = new ApolloServer({ schema });
  const app = express();
  const PORT = 3306;
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log("server start!");
  });
};

main();
