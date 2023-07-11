import mongoose from 'mongoose';
import Category from './Category.js'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  numProducts: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
