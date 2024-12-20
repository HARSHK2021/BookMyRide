const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./maps.service");

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
      throw new Error("Pickup and destination coordinates are required");
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
   
  
    /// calculating fare  
    const baseFare={
      auto:15,
      car:25,
      bike:10
    }
  
    const perKmRate={
      auto:10,
      car:13,
      bike:8
    }
    const perMinuteRate={
      auto:1,
      car:1.5,
      bike:0.5
    }
    const fare ={
      auto: Math.round(baseFare.auto + ((distanceTime.distance.value /1000) * perKmRate.auto) + ((distanceTime.duration.value/60) * perMinuteRate.auto)),
      car: Math.round(baseFare.car + ((distanceTime.distance.value/1000 )* perKmRate.car) + ((distanceTime.duration.value/60)* perMinuteRate.car)),
      bike: Math.round(baseFare.bike + ((distanceTime.distance.value/1000) * perKmRate.bike) + ((distanceTime.duration.value/60) * perMinuteRate.bike)),
    }
  
    return fare;
  
  
  
  }

  module.exports.getFare= getFare;

  function getOtp(){
    // generate a random 4 digit OTP
    return Math.floor(1000 + Math.random() * 9000);  // Generate a random number between 1000 and 9999
  }
  

module.exports.createRide = async ({
    user,
    pickup,
    destination,
    vehicleType,
    
}) => {
    // create a new ride
   
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required !!');
    }
    const fare = await getFare(pickup, destination,)
  
    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      otp:getOtp(),
      fare:fare[vehicleType]
    })

    return ride;
  

};


module.exports.confirmRide= async (
  {
    rideId, captain 
  }
)=>{
  // confirm the ride
if(!rideId){
  throw new Error('Ride ID is required!!');
}

await rideModel.findOneAndUpdate({
  _id:rideId
},{
  status:'accepted',
  captain:captain._id
})

const ride = await rideModel.findOne({
  _id:rideId
}).populate('captain').populate('user').select('+otp');
if(!ride){
  throw new Error('Ride not found!!');
}


return ride ;


}

module.exports.startRide = async ({rideId,otp,captain})=>{
  if(!rideId || !otp){
    throw new Error('Ride ID and OTP are required!!');
  }
  const ride = await rideModel.findOne({
    _id:rideId,
  }).populate('user').populate('captain').select('+otp');
  console.log("otp", otp)
  console.log("ride from start ride ",ride)

  if(!ride){
    throw new Error('Ride not found!!');
  }
  if(ride.status !== 'accepted'){
    throw new Error('Ride not in accepted by the  captain!!');
  }
  if(ride.otp !== otp){
    throw new Error('Invalid OTP!!!!');
  }
  await rideModel.findOneAndUpdate({
    _id:rideId
  },{
    status:'ongoing',
  })
  sendMessageToSocketId(ride.user.socketId,{
    event: 'ride-started',
    data: ride
  })
  return ride;

}


module.exports.endRide = async ({rideId,captain})=>{
  if(!rideId){
    throw new Error('Ride ID is required!!');
  }
  const ride = await rideModel.findOne({
    _id:rideId,
    captain:captain._id,
  }).populate('user').populate('captain').select('+otp');
  if(!ride){
    throw new Error('Ride not found!!');
  }
  if(ride.status!== 'ongoing'){
    throw new Error('Ride not in ongoing!!');
  }
  await rideModel.findOneAndUpdate({
    _id:rideId
  },{
    status:'completed',
  })

  sendMessageToSocketId(ride.user.socketId,{
    event: 'ride-ended',
    data: ride
  })
  return ride;
}