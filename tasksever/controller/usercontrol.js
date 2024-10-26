import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modal/user.js";
import dotenv from "dotenv";

dotenv.config()

export const reg =async (req,res)=>{
const saltRound=10;

let firstname=req.body.firstname
let lastname=req.body.lastname
let email=req.body.email
let password=req.body.password

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateName = (name) => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(name) && name.length <= 100;
};
if(!firstname){
  return res.status(400).json({message:"please enter fristname"})
}else if(!validateName(firstname)){
  return res.status(400).json({message:" only alphabetical charater enter and max 100 charater "})
}

if(!lastname){return res.status(400).json({message:"please enter lastname"})
}else if(!validateName(lastname)){
    return res.status(400).json({message:" only alphabetical charater enter and max 100 charater "})
  }
if(!email){
  return res.status(400).json({message:"please enter email"})
}else if(!validateEmail(email)){
  return res.status(400).json({message:" valide email "})
}

if(!password)return res.status(400).json({message:"please enter password"})
// if(firstname.length < 100 )return res.status(400).json({message:"max 100 value"})
let exemail=await User.findOne({email:email})
if(exemail)return res.status(400).json({message:"email already exists"})
bcrypt.hash(req.body.password,saltRound,
  async(err,hash)=>{
    try {
        let register=await new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hash
        })
        let usersave=await register.save();
        res.status(201).json({message:"register success"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

};


export const ownerreg =async (req,res)=>{
const saltRound=10;

let firstname=req.body.firstname
let lastname=req.body.lastname
let email=req.body.email
let password=req.body.password

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateName = (name) => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(name) && name.length <= 100;
};
if(!firstname){
  return res.status(400).json({message:"please enter fristname"})
}else if(!validateName(firstname)){
  return res.status(400).json({message:" only alphabetical charater enter and max 100 charater "})
}

if(!lastname){return res.status(400).json({message:"please enter lastname"})
}else if(!validateName(lastname)){
    return res.status(400).json({message:" only alphabetical charater enter and max 100 charater "})
  }
if(!email){
  return res.status(400).json({message:"please enter email"})
}else if(!validateEmail(email)){
  return res.status(400).json({message:" valide email "})
}

if(!password)return res.status(400).json({message:"please enter password"})
// if(firstname.length < 100 )return res.status(400).json({message:"max 100 value"})
let exemail=await User.findOne({email:email})
if(exemail)return res.status(400).json({message:"email already exists"})
bcrypt.hash(req.body.password,saltRound,
  async(err,hash)=>{
    try {
        let register=await new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hash,
            isOwner:true
        })
        let usersave=await register.save();
        res.status(201).json({message:"register success"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

};


export const login = async (req, res) => {
  console.log(req.body)
    let email = req.body.email?.toLowerCase();
    let foundUser = await User.findOne({ email: email });
    if (!req.body.email)
      return res.status(400).json({ message: "please enter email" });
    if (!req.body.password)
      return res.status(400).json({ message: "please enter password" });
    if (foundUser) {
      bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
        
        if (result) {
          try {
            const token = jwt.sign({ id: foundUser?._id }, process.env.JWT, {
              expiresIn: "4h",
            });
            res.header("token", token).json({
              message: "login successfully",
              token: token
            });
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        } else {
          res.status(400).json({ message: "please enter correct password" });
        }
      });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  };
  
  export const getAllUsers = async (req, res) => {
    try {
      let users = await User.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const getUserById = async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
export const profile = async (req, res) => {
    try {
      console.log("User from request:", req.user);
      // let user = await User.findById({_id: req.user.id});
      res.status(200).json({ user:req.user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  export const UpdateUser = async (req, res) => {
    try {
      let user = await User.findByIdAndUpdate(req.params.id,
        {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          email:req.body.email,
      });
      res.status(200).json({ message:"update sucessfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  export const deleteuser = async (req, res) => {
    try {
      let user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json({ message:"Delete sucessfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


