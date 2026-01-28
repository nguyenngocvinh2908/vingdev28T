// [GET] : "/products"
const Product = require('../../models/product.js')
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: 'active',
    deleted: false
  })
  
  res.render('client/pages/products/index.pug', {
    titlePage: 'Product Page',
    products: products
  })
}

// [ GET ]: "/products/:slug"
module.exports.detail = async (req, res) => {
  const slug = req.params.slug
  const product = await Product.findOne({
    slug: slug,
    status: 'active',
    deleted: false
  })
  res.render('client/pages/products/detail.pug', {
    titlePage: product.title,
    product: product
  })
}