import mongoose from 'mongoose';
import Menu from './MenuModel';
import Store from '../Store/StoreModel';
import { setUpdatable } from '../helpers';

// methods for graphql
let MenuMethods = {};

MenuMethods.getAllByStoreId = (root, {store_id}) => {
  return new Promise((resolve, reject) => {
    Menu.find({store: store_id}).exec((err, menus) => {
      err ? reject(err) : resolve(menus);
    });
  });
};

MenuMethods.getById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Menu.findById(id).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

MenuMethods.insert = (root, fields) => {
  return new Promise((resolve, reject) => {
    const storeId = fields.store;
    Store.findById(storeId).exec((err, store) => {
      if (err) reject("Store id was not found");
      let newMenu = new Menu({...fields});
      newMenu.save((err, menu) => {
        if (err) reject(err);
        store.menus.push(menu._id);
        store.save((err, res) => {
          err ? reject(err) : resolve(menu);
        });
      });
    })
  });
};

MenuMethods.updateById = (root, parameters) => {
  const updatable = setUpdatable(parameters);
  return new Promise((resolve, reject) => {
    Menu.findByIdAndUpdate(
      updatable.id,
      { $set: updatable.data },
      { new: true }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

MenuMethods.removeById = (root, { id }) => {
  return new Promise((resolve, reject) => {
    Menu.findByIdAndRemove(id).exec((err, menu) => {
      if (err) reject(err);
      Store.findById(menu.store).exec((err, store) => {
        const index = store.menus.indexOf(menu._id);
        if (index > -1) store.menus.splice(index, 1);
        store.save((err, res) => {
          err ? reject(err) : resolve(menu);
        })
      });
    });
  });
};


export default MenuMethods;
