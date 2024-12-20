const axios = require("axios");
const captainModel = require('../models/captain.model')
module.exports.getAddressCoordinate = async (address) => {
  apiKey=process.env.GOOGLE_MAP_API
  
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  try{
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      console.error(`Error: ${response.data.status}`);
      throw new Error("Failed to fetch address coordinate");
    }
  } catch (error) {
    console.error("Error fetching address coordinate:", error.message);
    throw error;
  }
};


module.exports.getDistanceTime=async (origin, destination)=>{
  if(!origin || !destination){
    throw new Error("Origin and destination are required");
  }
  const apiKey=process.env.GOOGLE_MAP_API;
  // console.log(apiKey);
  // console.log(origin);
  // console.log(destination)
  
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${apiKey}`
  // console.log(url);
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      // if(response.data.row[0].elements[0].status === "ZERO_RESULTS"){
      //   throw new Error("No route found between the given locations");
      // }
      const distance = response.data.rows[0].elements[0].distance;
      const duration = response.data.rows[0].elements[0].duration;
      return { distance, duration };
    } else {
      console.error(`Error: ${response.data.status}`);
      throw new Error("Failed to fetch distance and time");
    }

    
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
    
  }


}

module.exports.getaAutoCompleteSuggestions=async(input)=>{
 
  if(!input){
    throw new Error("Input is required");
  }
  const apiKey=process.env.GOOGLE_MAP_API;
  
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
  // console.log(url)

  try {
    // console.log("insise")
    const response = await axios.get(url);
    // console.log(response)
    if (response.data.status === "OK") {
      return response.data.predictions.map(prediction => prediction.description).filter(value => value);
    } else {
      console.error(`Error: ${response.data.status}`);
      throw new Error("Failed to fetch auto complete suggestions");
    }
    
  } catch (error) {
    console.error("Error fetching auto complete suggestions:", error.message);
    throw error;
    
  }


}

module.exports.getCaptainsInTheRadius = async(ltd,lng,radius)=>{

  //radius in km
  const captains = await captainModel.find({
    location:{
      $geoWithin:{
        $centerSphere:[[ltd, lng], radius /6371] 
      }

    }
  });
  
  return captains;

}