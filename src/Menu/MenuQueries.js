import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import MenuType from './MenuType';
import Menu from './MenuMethods';

export default {
  menus: {
    type: new GraphQLList(MenuType),
    args: {
      store_id: {type: GraphQLID}
    },
    resolve: Menu.getAllByStoreId
  },
  menu: {
    type: MenuType,
    args: {
      id: {type: GraphQLID}
    },
    resolve: Menu.getById
  }
};
