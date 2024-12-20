const mapService = require('../services/maps.service')
const {validationResult}= require('express-validator')


module.exports.getCoordinates = async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {address}= req.query;
    try{
        const coordinates= await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    }
    catch(error){
        
        res.status(404).json({message: 'Coordinates not found'});
    }

}

module.exports.getDistanceAndTime= async (req, res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {origin, destination}= req.query;
    try{
        const distanceAndTime= await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceAndTime);  //send distance and time in response  as a JSON object
       
    }
    catch(error){
        res.status(404).json({message: 'Distance and time not found'});
    }
 
}


module.exports.getaSuggestions=async (req, res)=>{
    try {
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {input}= req.query;
        const suggestions= await mapService.getaAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);  //send suggestions in response as a JSON object
        
    } catch (error) {
        res.status(500).json({message: 'Suggestions not found'});
        
    }

}