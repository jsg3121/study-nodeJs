import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import schema from './schema/schema';

const app = express();
const server = new ApolloServer({
  schema
});

app.use("*", cors());

server.applyMiddleware({ app, path: '/graphql' });

app.listen(
  4000,
  (): void => console.log("server start")
);
