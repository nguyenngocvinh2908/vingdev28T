const express = require('express')
const routerDashboard = express.Router()
const controllerDashboard = require('../../controllers/admin/dashboard')

routerDashboard.get('/', controllerDashboard.index)

module.exports = routerDashboard