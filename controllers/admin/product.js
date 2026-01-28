const mongoose = require("mongoose");
const Product = require("../../models/product.js")
const fillsHelper = require("../../helpers/fills.js")
const searchHelper = require("../../helpers/search.js")
const pavigationHelper = require("../../helpers/pavigation.js")

// [GET] : "/admin/products"
module.exports.index = async (req, res) => {
  // Tra Cứu DataBase Qua Conditon
  let find = {
    deleted: false
  }

  // Lọc Sản Phẩm Theo Fillter
  const statusQuery = req.query.status
  const fills = fillsHelper(statusQuery)
  if(statusQuery) {
    find.status = statusQuery
  }

  // Search Products
  const searchStatus = req.query.keyword
  const objSearch = searchHelper(searchStatus)
  if(objSearch.regex) {
    find.title = objSearch.regex
  }
  
  // Pavigation (Phân Trang)
  const urlPage = req.query.page
  const totalProducts = await Product.countDocuments(find)
  const objPavigation = pavigationHelper(urlPage, totalProducts)

  const products = await Product.find(find).sort({ position: "desc"}).limit(objPavigation.limitProducts).skip(objPavigation.skipProducts)

  res.render('admin/pages/products/index.pug', {
    titlePage: "Trang Product Admin",
    products: products,
    fills: fills,
    keyword: objSearch.keyword,
    pavigation: objPavigation
  })
}

// [PATCH :] "/admin/products/change-status/:status/:id"
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status
  const id = req.params.id
  await Product.updateOne({_id : id}, {status: status})
  req.flash('success', 'Update Success!!!')
  res.redirect(req.get('referer')) // Quay Lại Link Trước Đó
}

// [PATCH] : "/admin/products/change-multi"
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type
  const ids = req.body.ids.split(", ")
  switch (type) {
    case 'active':
      await Product.updateMany({ _id: { $in: ids}}, { status: "active" })
      req.flash('success', `Update Success ${ids.length} products`)
      break
    case 'inactive':
      await Product.updateMany({ _id: { $in: ids }}, { status: "inactive" })
      req.flash('success', `Update Success ${ids.length} products`)
      break
    case 'delete-all':
      await Product.updateMany({ _id: { $in: ids }}, { deleted: true, deleteAt: new Date()})
      req.flash('success', `Delete Success ${ids.length} products`)
      break
    case 'position':
      for(const idPosition of ids) {
        const [ id, position ] = idPosition.split("-")
        const positionConvertInt = parseInt(position)
        await Product.updateOne({ _id: id }, { position: positionConvertInt })
      }
      break
    default:
      break;
  }
  res.redirect(req.get('referer'))
}

// [DELETE] : "/admin/products/delete/:id"
module.exports.deleteProduct = async (req, res) => {
  const idDelete = req.params.id
  await Product.updateOne({ _id : idDelete }, { deleted : true, deleteAt: new Date() })
  req.flash('success', `Delete Success`)
  res.redirect(req.get('referer'))
}

// [ GET ] : "/admin/products/create"
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Add New Product"
  })
}

// [ POST ]: /admin/products/create
module.exports.createPost = async (req, res) => {
  const fieldsToConvert = ["price", "discountPercentage", "stock"];
  fieldsToConvert.forEach(field => {
    if(req.body[field]) req.body[field] = parseInt(req.body[field])
  })
  const countProducts = await Product.countDocuments()
  if(req.body.position == "") req.body.position = countProducts + 1
  if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`
  const productCreate = new Product(req.body)
  await productCreate.save()
  res.redirect('/admin/products')
}

// [ GET ]: /admin/products/edit
module.exports.edit = async(req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
    const idProduct = await Product.findOne(find)
    res.render('admin/pages/products/edit', {
      pageTitle: "Edit Product",
      idProduct: idProduct
    })
    
  } catch (error) {
    req.flash('error', 'Product not found')
    res.redirect('/admin/products')
  }
}

// [ PATCH ]: /admin/products/edit/:id
module.exports.editPost = async (req, res) => {
  try {
    const idEdit = req.params.id
    const fieldsToConvert = ["price", "discountPercentage", "stock", "position"];
    fieldsToConvert.forEach(field => {
      if(req.body[field]) req.body[field] = parseInt(req.body[field])
    })
    if(req.file) req.body.thumbnail = `/uploads/${req.file.filename}`
    await Product.updateOne({ _id: idEdit }, req.body)
    req.flash('success', 'Update Product Success')
    res.redirect(req.get('referer'))
  } catch (error) {
    req.flash('error', 'Product not found')
    res.redirect('/admin/products')
  }
}

// [ GET ]: /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const idDetail = req.params.id
    const productDetail = await Product.findOne({ _id: idDetail, deleted: false })
    res.render('admin/pages/products/detail', {
      pageTitle: productDetail.title,
      productDetail: productDetail
    })
  } catch (error) {
    req.flash('error', 'Product not found')
    res.redirect('/admin/products')
  }
}