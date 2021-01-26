import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Query, Resolver } from 'type-graphql';
import { createConnection } from "typeorm";
@Resolver()
class HelloResolver {
  @Query(() => {
    return String;
  }, { nullable: true })
  async hello() {
    return "hello sungyu!!!!";
  }
}

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({
    schema
  });
  const app = express();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, (): void => console.log("server start"));
};

main();





