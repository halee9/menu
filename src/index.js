import {
  GraphQLObjectType
} from 'graphql'

import { StoreQueries, StoreMutations } from './Store';
import { MenuQueries, MenuMutations } from './Menu';

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Realize Root Query',
  fields: () => {
    return {...StoreQueries, ...MenuQueries};
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Realize Root Mutation',
  fields: () => {
    return {...StoreMutations, ...MenuMutations};
  }
});

export {
  RootQuery,
  RootMutation
}
