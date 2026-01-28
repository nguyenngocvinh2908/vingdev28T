// Load environment variables from .env file ( Thư Viện dotenv )
require('dotenv').config()
const post = process.env.PORT
// Express Setup
const express = require('express')
const app = express()

// Express Flash
const flash = require('express-flash')
const sessionExpress = require('express-session') //  Thư Viện Này Hỗ Trợ Cho Express Flash
const cookieParser = require('cookie-parser') // Thư Viện Này Hỗ Trợ Cho Express Flash
app.use(cookieParser('ABABABABABAB'));
app.use(sessionExpress({ cookie: { maxAge: 60000 }}));
app.use(flash());

// Body-Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded()) // parse application/x-www-form-urlencoded

// Method-Override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Mongoose Setup Data
const dataBase = require('./config/database.js')
dataBase.connect()

// Pug Setup
app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

// Public Folder Setup
app.use(express.static(`${__dirname}/public`))

// Routes Setup
const clientRoutes = require('./routes/client/index')
clientRoutes(app)
const adminRoutes = require('./routes/admin/index')
adminRoutes(app)

// App Variable Local
const systemConfig = require("./config/system.js")
const session = require('express-session')
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Start Server
module.exports = app