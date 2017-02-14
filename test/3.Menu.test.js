import { expect } from 'chai';
import mongoose from 'mongoose';
let Menu = mongoose.model('Menu');
let Store = mongoose.model('Store');

import { graphql, GraphQLSchema } from 'graphql';
import { RootQuery, RootMutation } from '../src/index';

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

describe('Menu', () => {
  before((done) => {
    Menu.remove({}, (err) => {
      Store.remove({}, (err) => {
        done();
      });
    });
  });

  describe('model', () => {
    it('should be invalid if name is empty', (done) => {
      var m = new Menu();
      m.validate((err) => {
        expect(err.errors.name).to.exist;
        done();
      });
    });
  });

  describe('query and mutaion', () => {
    let menuId;
    let storeId;
    it('should add a new store', async () => {
      const mutation = `
        mutation {
          addStore(name: "Midori", email: "midori@gmail.com", phone: "206-011-0011") {
            name,
            id
          }
        }
      `;
      const result = await graphql(schema, mutation);
      const { data } = result;
      expect(data.addStore.name).to.eql('Midori');
      storeId = data.addStore.id;
    });

    it('should add a new menu', async () => {
      const name = 'Menu2';
      const price = 9.99;
      const categories = [1];
      const mutation = `
        mutation {
          addMenu(
            name: "${name}",
            price: ${price},
            categories: ${categories},
            store: "${storeId}"
          ) {
            name,
            price,
            categories,
            store,
            id
          }
        }
      `;
      const result = await graphql(schema, mutation);
      // console.log(result);
      expect(result).to.deep.equal({
        data: {
          addMenu: {
            name,
            price,
            categories,
            store: storeId,
            id: result.data.addMenu.id
          }
        }
      });
      menuId = result.data.addMenu.id;
    });

    it('should not add a new menu with wrong store id', async () => {
      const name = 'Menu2';
      const price = 9.99;
      const categories = [1];
      const fakeStoreId = "asdffagsd";
      const mutation = `
        mutation {
          addMenu(
            name: "${name}",
            price: ${price},
            categories: ${categories},
            store: "${fakeStoreId}"
          ) {
            name,
            price,
            categories,
            store,
            id
          }
        }
      `;
      const result = await graphql(schema, mutation);
      // console.log(result);
      expect(result.data.addMenu).to.null;
    });

    it('should display the menu by id', async () => {
      const query = `
        query {
          menu(id: "${menuId}") {
            name,
            price
          }
        }
      `;
      const result = await graphql(schema, query);
      expect(result).to.deep.equal({
        data: {
          menu: {
            name: 'Menu2',
            price: 9.99
          }
        }
      });
    });

    it('should not display all the menus by wrong store id', async () => {
      const fakeStoreId = "asdf";
      const query = `
        query {
          menus(store_id: "${fakeStoreId}") {
            name,
            price,
            store
          }
        }
      `;
      const result = await graphql(schema, query);
      expect(result.data.menus).to.null;
    });

    it('should display all the menus by store id', async () => {
      const query = `
        query {
          menus(store_id: "${storeId}") {
            name,
            price
          }
        }
      `;
      const result = await graphql(schema, query);
      expect(result).to.deep.equal({
        data: {
          menus: [{
            name: 'Menu2',
            price: 9.99
          }]
        }
      });
    });

    it('should update the menu by id', async () => {
      const query = `
        mutation {
          updateMenu(id: "${menuId}", price: 10.99) {
            name,
            price
          }
        }
      `;
      const result = await graphql(schema, query);
      expect(result).to.deep.equal({
        data: {
          updateMenu: {
            name: 'Menu2',
            price: 10.99
          }
        }
      });
    });

    it('should remove a menu by id', async () => {
      const mutation = `
        mutation {
          removeMenu(id: "${menuId}") {
            id
          }
        }
      `;
      const result = await graphql(schema, mutation);
      const { data } = result;
      expect(data.removeMenu.id).to.eql(menuId);
    });

  });

});
