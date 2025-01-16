const mongoose = require('mongoose')

const DBconnect = async()=>{
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI)
    console.log('DB connected Successfully');
  } catch (error) {
    console.log('DB connection Failed');
  }
}

module.exports = DBconnect