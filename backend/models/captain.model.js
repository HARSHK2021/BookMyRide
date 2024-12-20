const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3,'first name must be at least 3 characters']
        },
        lastname:{
            type: String,
            required: true,
            minlength:[3,'last name must be at least 3 characters']
        }
    },

    email:{
        type: String,
        required: true,
        unique: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: true,
        minlength:[6,'password must be at least 6 characters long'],
        select: false,
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true
        },
       
        plate:{
            type: String,
            required: true
        },
        capacity:{
            type: Number,
            required: true,
            min:1,
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'auto', 'bike']
        }


    },
    location:{
       ltd:{
        type: Number,
       
       },
       lng:{
        type: Number,
       }
    }


})


captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
};
captainSchema.methods.comparePassword =  async function(password){
    const match = await bcrypt.compare(password, this.password)
    return  await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashpassword= async function(password){
    return await  bcrypt.hash(password, 10);
};







const captainModel = mongoose.model('captain', captainSchema)
module.exports = captainModel;