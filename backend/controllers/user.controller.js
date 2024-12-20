const userModel = require("../models/user.model");
const userService = require("../services/user.service")
const {validationResult}= require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model')

/// register user
module.exports.registerUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname,email,password}= req.body;
    const userAlreadyExists= await userModel.findOne({email});
    if(userAlreadyExists){
        return res.status(400).json({message: "User already exists with this email"});
    }
    const firstname= fullname.firstname;
    const lastname= fullname.lastname;
    const hashedPassword = await userModel.hashpassword(password);
    const user = await userService.createUser({
        firstname, lastname, email, password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({user, token});

}

///user login 
module.exports.loginUser = async(req,res,next)=>{
    //logic for user login
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password}= req.body;
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: "Invalid email or password"});

    }
    const isMatch =  await user.comparePassword(password);
    
   
    if(!isMatch){
        return res.status(401).json({message: "Invalid email or password"});
    }

    const token = user.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({token,user})  

}

//// get users profile

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user)
  

}


/// logout user 

    module.exports.logoutUser = async(req,res,next)=>{
        res.clearCookie('token')
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        await blacklistTokenModel.create({token});

        res.status(200).json({message: "Logged out"})
      
  
    }