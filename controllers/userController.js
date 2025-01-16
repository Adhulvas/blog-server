const USER = require('../models/userModel')
const CONTACT = require('../models/contactModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userLogin = async(req,res)=>{
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({message:'all fields required'})
    }

    const existingUser = await USER.findOne({email})

    if(!existingUser) {
      return res.status(400).json({message:'user does not exist'})
    }

    const matchedPassword = await bcrypt.compare(password,existingUser.password)

    if(!matchedPassword) {
      return res.status(400).json({message:'Invalid password'})
    }

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_PASSWORD || 'your_secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ success:true, message:'Login successfull',token})
  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


const userSignup = async(req,res)=>{
  try {
    const { name, email, password} = req.body

    if(!name || !email || !password) {
      return res.status(400).json({message:'all fields required'})
    }

    const userExist = await USER.findOne({email})

    if(userExist){
      return res.status(400).json({message:'user already exist'})
    }

    const hashedPassword = bcrypt.hashSync(password,10)

    const newUser = new USER({name,email,password:hashedPassword})
    await newUser.save()


    res.status(201).json({success:true, message:'Signup successfull'})
  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


const contactUs = async(req,res)=>{
  try {
    const { name, email, message} = req.body

    if(!name || !email || !message) {
      return res.status(400).json({message:'all fields required'})
    }

    const existingContact = await CONTACT.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ message: 'This email has already been used to contact us.' });
    }

    const contactEntry = new CONTACT({ name, email, message });
    await contactEntry.save();

    res.status(200).json({ message: "Your message has been received. Thank you!" });
  } catch (error) {
    console.error("Error handling contact form:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." })
  }
}

module.exports = {userLogin, userSignup, contactUs}