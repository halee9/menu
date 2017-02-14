import express from 'express';
var session = require('express-session');
var graphqlHTTP = require('express-graphql');

import { graphql, GraphQLSchema } from 'graphql';
import { RootQuery, RootMutation } from './src/index';

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

import db from './test/1.mongo-connect';

var app = express();

app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }}));

app.use('/graphql', graphqlHTTP((request) => ({
  schema: schema,
  rootValue: { session: request.session },
  graphiql: true
})));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

export default app;
