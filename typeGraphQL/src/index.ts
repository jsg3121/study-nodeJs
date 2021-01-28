import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server';
import { createConnection } from "typeorm";
// import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
// import { buildSchema } from 'type-graphql';
// import { RegisterResolver } from "./resolver/resolver";

// apollo-server와 apollo-server-express는 둘 다 graphql을 사용할 때 필요하지만 
// apollo-server-express는 서버를 express로 만들고 apollo-server는 자체적인 서버를 만든다
// apollo-server-express는 express를 이용하여 서버를 만들기 떄문에 Middleware를 연결해 주어야하며 
// express를 감싸서 서버의 역할을 하는것이기 때문에 express의 일부 기능이 제대로 작동하지 않을 수 있다.
// ✨ 아래 주석으로 가린 부분이 apollo-server-express를 사용할 경우
// ✨ 주석으로 가려지지 않았지만 resolvers와 server의 역할은 두 모듈 모두 같다

const main = async () => {
  await createConnection();

  // const schema = await buildSchema({
  //   resolvers: [RegisterResolver],
  // });

  // const app = express();

  // server.applyMiddleware({ app, path: '/graphql' });

  // app.listen(4000, (): void => console.log("server start"));

  const typeDefs = gql`
    type Query {
      "A simple type for getting started!!!@@#!@#!@!$"
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => {
        return "Hello everyone~~~~~~~~~";
      }
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.listen().then((url) => {
    console.log(`Hello ${url}`);
  });

};

main();





