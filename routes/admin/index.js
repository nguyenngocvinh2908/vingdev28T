const routerDashboard = require('./dashboard.js')
const routerProduct = require('./product.js')
const systemConfig = require('../../config/system.js')

module.exports = (app) => {
  app.use(systemConfig.prefixAdmin + '/dashboard', routerDashboard)
  
  app.use(systemConfig.prefixAdmin + '/products', routerProduct)
}