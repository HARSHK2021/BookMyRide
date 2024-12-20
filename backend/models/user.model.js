const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
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
    }
})

/// methods 
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
};

userSchema.methods.comparePassword =  async function(password){
    // console.log("req",password)
    // console.log("db password",this.password)
    const match = await bcrypt.compare(password, this.password)
    // console.log(match)

  
    return  await bcrypt.compare(password, this.password);
};

userSchema.statics.hashpassword= async function(password){
    return await  bcrypt.hash(password, 10);
};


const userModel = mongoose.model('User',userSchema);

module.exports = userModel;