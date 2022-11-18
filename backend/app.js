import express from 'express'; 
// require("dotenv").config();
import { ApolloServer, gql } from 'apollo-server-express';
import {typeDefs} from './src/graphql/schema.js'
import {resolvers} from './src/graphql/resolvers.js'

const app = express();
const port = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/' });



app.listen(port, () => {
  console.log(`🚀 GRAPHQL Server is running at http://localhost:${process.env.PORT || port}`);
});

