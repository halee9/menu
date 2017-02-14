import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import Menu from '../Menu/MenuModel';

var StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  email: String,
  categories: [{
    _id: { type: Number, required: true },
    name: { type: Number, required: true }
  }],
  menus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }]
},
{
  timestamps: true
});

const StoreModel = mongoose.model('Store', StoreSchema);
export default StoreModel;
