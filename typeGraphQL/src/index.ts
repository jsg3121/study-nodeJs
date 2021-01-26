import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { buildSchema, Query, Resolver } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => {
    return String;
  }, { name: "Hello" })
  async hello() {
    return "hello sungyu!!!!";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({
    schema
  });
  const app = express();

  app.use("*", cors());

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, (): void => console.log("server start"));
};

main();





