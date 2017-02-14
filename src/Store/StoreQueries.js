import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import StoreType from './StoreType';
import Store from './StoreMethods';

export default {
  stores: {
    type: new GraphQLList(StoreType),
    resolve: Store.getAll
  },
  store: {
    type: StoreType,
    args: {
      id: {type: GraphQLID}
    },
    resolve: Store.getById
  }
};
