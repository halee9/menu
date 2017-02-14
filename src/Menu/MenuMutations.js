import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
  } from 'graphql';

import MenuType from './MenuType';
import Menu from './MenuMethods';

export default {
  addMenu:{
    type: MenuType,
    args: {
      name: {type: new GraphQLNonNull(GraphQLString)},
      price: {type: new GraphQLNonNull(GraphQLFloat)},
      description: {type: GraphQLString},
      categories: {type: new GraphQLList(GraphQLInt)},
      store: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: Menu.insert
  },
  updateMenu:{
    type: MenuType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)},
      name: {type: GraphQLString},
      price: {type: GraphQLFloat},
      description: {type: GraphQLString},
      categories: {type: new GraphQLList(GraphQLInt)},
    },
    resolve: Menu.updateById
  },
  removeMenu:{
    type: MenuType,
    args: {
      id: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve: Menu.removeById
  }

};
