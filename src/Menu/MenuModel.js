import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import Store from '../Store/StoreModel';

const Schema = mongoose.Schema;

var MenuSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  categories: [ Number ],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
},
{
  timestamps: true
});

const MenuModel = mongoose.model('Menu', MenuSchema);
export default MenuModel;
