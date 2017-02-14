import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import StoreType from './StoreType';
import Store from './StoreMethods';

export default {
  addStore:{
    type: StoreType,
    args: {
      name: {type: new GraphQLNonNull(GraphQLString)},
      phone: {type: new GraphQLNonNull(GraphQLString)},
      email: {type: new GraphQLNonNull(GraphQLString)},
    },
    resolve: Store.insert
  },
  updateStore:{
    type: StoreType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)},
      name: {type: GraphQLString},
      phone: {type: GraphQLString},
      email: {type: GraphQLString}
    },
    resolve: Store.updateInfoById
  },
  removeStore:{
    type: StoreType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: Store.removeById
  }
};
