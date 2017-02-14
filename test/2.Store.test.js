import { expect } from 'chai';
// import Store from '../src/Store/Store';
import mongoose from 'mongoose';
let Store = mongoose.model('Store');

import { graphql, GraphQLSchema } from 'graphql';
import { RootQuery, RootMutation } from '../src/index';

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

describe('Store', () => {
  before((done) => {
    Store.remove({}, (err) => {
      done();
    });
  });
  describe('model', () => {
    it('should be invalid if name is empty', (done) => {
      var m = new Store();
      m.validate((err) => {
        expect(err.errors.name).to.exist;
        done();
      });
    });
    it('should be created if name exist', (done) => {
      var m = new Store({name: "Midori"});
      m.save((err) => {
        expect(err).to.null;
        done();
      });
    });
  });

  describe('query and mutaion', () => {
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

    it('should display all the store', async () => {
      const query = `
        query {
          stores {
            name
          }
        }
      `;
      const result = await graphql(schema, query);
      expect(result).to.deep.equal({
        data: {
          stores: [
            {
              name: 'Midori'
            },
            {
              name: 'Midori'
            }
          ]
        }
      });
    });

    it('should display the store by id', async () => {
      const query = `
        query {
          store(id: "${storeId}") {
            name,
            email,
            phone
          }
        }
      `;
      const result = await graphql(schema, query);
      expect(result).to.deep.equal({
        data: {
          store: {
            name: 'Midori',
            email: 'midori@gmail.com',
            phone: '206-011-0011'
          }
        }
      });
    });

    it('should update a store info', async () => {
      const mutation = `
        mutation {
          updateStore(id: "${storeId}", name: "Midori2") {
            name,
            phone
          }
        }
      `;
      const result = await graphql(schema, mutation);
      const { data } = result;
      expect(data.updateStore.name).to.eql('Midori2');
      expect(data.updateStore.phone).to.eql('206-011-0011');
    });

    it('should remove a store by id', async () => {
      const mutation = `
        mutation {
          removeStore(id: "${storeId}") {
            id
          }
        }
      `;
      const result = await graphql(schema, mutation);
      const { data } = result;
      expect(data.removeStore.id).to.eql(storeId);
    });


  });

});
