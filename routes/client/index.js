const routerProduct = require('./product')
const routerHome = require('./home')
module.exports = (app) => {
  app.use('/', routerHome)
  
  app.use('/products', routerProduct)
}
