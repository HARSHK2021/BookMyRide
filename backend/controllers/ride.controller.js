
const rideSerice= require('../services/ride.service')
const {validationResult}= require('express-validator')
const mapService= require('../services/maps.service')
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')

module.exports.createRide = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {pickup,destination,vehicleType} = req.body;
        
    try{
        const ride = await rideSerice.createRide({user:req.user._id, pickup, destination, vehicleType});
         res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
      
        // const destinationCoordinates = await mapService.getAddressCoordinate(destination);
        // console.log("destinationCoordinates", destinationCoordinates)

         const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2000);
        //  console.log("getCaptainsInTheRadius", captainsInRadius)

        ride.otp="";
        const rideWithUser = await rideModel.findById(ride._id).populate('user')
    //    console.log("ride with user ",rideWithUser)
        captainsInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
         
        })
       

        

    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:error.message});
    }
  
}
module.exports.getFare = async(req, res,)=>{
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {pickup,destination} = req.query;
    try{
        const fare = await rideSerice.getFare(pickup, destination);
        return res.status(200).json(fare);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

module.exports.confirmRide= async(req, res)=>{
    // console.log("confirem ride called --------->")
    const errors  = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {rideId} = req.body;
    try{
        const ride = await rideSerice.confirmRide({rideId,captain:req.captain});
        console.log("ride user socket id", ride.user.socketId)

        sendMessageToSocketId(ride.user.socketId,{
            event: 'ride-confirmed',
            data: ride
        })
        // console.log("response from confrom ride",ride)
        return res.status(200).json(ride);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: error.message});
    }

}

module.exports.startRide= async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {rideId,otp}= req.query;
    try{
        const ride = await rideSerice.startRide({rideId,otp,captain:req.captain});
        sendMessageToSocketId(ride.user.socketId,{
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: error.message});
    }

}

module.exports.endRide= async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {rideId}= req.body;
    try{
        const ride = await rideSerice.endRide({rideId,captain:req.captain});
        console.log("ride ended successfully" ,ride)
        sendMessageToSocketId(ride.user.socketId,{
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    }catch(error){
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}