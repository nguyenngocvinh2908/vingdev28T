const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater') // Import the slug plugin
mongoose.plugin(slug) // Apply the slug plugin to mongoose

const productSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, slug: 'title', unique: true },
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    status: String,
    stock: Number,
    deleted: {
      type: Boolean,
      default: false
    },
    thumbnail: String,
    deleteAt: Date,
    position: Number
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', productSchema, 'products')
module.exports = Product