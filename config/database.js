const mongoose = require('mongoose')

module.exports.connect =  () => {
  try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log("Connect Success!")
  } catch (error) {
    console.log("Connect Error!")
  }
}