const express = require('express')
const routerProduct = express.Router() // Khoi Tao Router
const controllerProduct = require("../../controllers/admin/product.js")
const validateProduct = require('../../validate/product.js')
const multer  = require('multer')
const storageMulter = require('../../helpers/storageMulter.js')
const upload = multer({ storage: storageMulter() })

routerProduct.get('/', controllerProduct.index)
routerProduct.patch('/change-status/:status/:id', controllerProduct.changeStatus)
routerProduct.patch('/change-multi', controllerProduct.changeMulti)
routerProduct.delete('/delete/:id', controllerProduct.deleteProduct)
routerProduct.get('/create', controllerProduct.create)
routerProduct.post('/create', upload.single('thumbnail'), validateProduct.createPost, controllerProduct.createPost)
routerProduct.get('/edit/:id', controllerProduct.edit)
routerProduct.patch('/edit/:id', upload.single('thumbnail'), validateProduct.createPost, controllerProduct.editPost)
routerProduct.get('/detail/:id', controllerProduct.detail)

module.exports = routerProduct