import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

const MenuType = new GraphQLObjectType({
  name: 'Menu',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    price: {type: new GraphQLNonNull(GraphQLFloat)},
    description: {type: GraphQLString},
    categories: {type: new GraphQLList(GraphQLInt)},
    store: {type: new GraphQLNonNull(GraphQLID)}
  })
});

export default MenuType;
