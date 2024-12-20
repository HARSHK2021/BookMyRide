const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.authUser= async(req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message: 'authorization denied'});

    }
    const isBlacklisted = await blackListTokenModel.findOne({token:token});
    
    if(isBlacklisted){
        return res.status(401).json({message: 'authorization denied'});
        
 
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user= user;
        return next();
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: 'authorization denied'});
        
    }
}

module.exports.authCaptain =async(req, res, next)=> {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    

    if(!token){
        return res.status(401).json({message: 'authorization denied'});
      }

      const isBlacklisted = await blackListTokenModel.findOne({token:token});
      if(isBlacklisted){
          return res.status(401).json({message: 'authorization denied'});
      }
          
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        
        req.captain= captain;
        return next();
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({message: 'authorization denied'});
        
    }
}


