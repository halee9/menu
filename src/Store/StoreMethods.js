import _ from 'lodash';
import mongoose from 'mongoose';
import Store from './StoreModel';
import { setUpdatable } from '../helpers';

// methods for graphql
let store = {};
store.getAll = () => {
  return new Promise((resolve, reject) => {
    Store.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

store.getById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Store.findById(id).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

store.insert = (root, { name, phone, email }) => {
  return new Promise((resolve, reject) => {
    var newStore = new Store({name: name, phone: phone, email: email});
    newStore.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

store.updateInfoById = (root, parameters) => {
  const updatable = setUpdatable(parameters);
  return new Promise((resolve, reject) => {
    Store.findByIdAndUpdate(
      updatable.id,
      { $set: updatable.data },
      { new: true }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

store.removeById = (root, { id }) => {
  return new Promise((resolve, reject) => {
    Store.findByIdAndRemove(id).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

const StoreMethods = store;
export default StoreMethods;
