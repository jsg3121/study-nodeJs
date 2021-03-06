import "graphql-import-node";
import * as typeDefs from "./schema.graphql";
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from "../resolver/NOT.resolverMap";
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
