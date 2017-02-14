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

const CategoryType = new GraphQLObjectType({
  name: 'category',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString}
  })
});

const StoreType = new GraphQLObjectType({
  name: 'store',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID)},
    name: {type: GraphQLString},
    phone: {type: GraphQLString},
    email: {type: GraphQLString},
    categories: {type: new GraphQLList(CategoryType)}
  })
});

export default StoreType;
