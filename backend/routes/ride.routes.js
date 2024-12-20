const express = require('express')
const router = express.Router()
const {body,query} = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invald Pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invald Destination'),
    body('vehicleType').isString().isIn(['auto','car','bike']).withMessage('Invald Vehicle Type'),
    rideController.createRide
)
router.get('/get-fare',authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invald Pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Invald Destination'),
    
    rideController.getFare
)
router.post('/confirm', authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
    rideController.confirmRide
)
router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid Ride ID'),
    
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
    rideController.endRide
)
module.exports = router;