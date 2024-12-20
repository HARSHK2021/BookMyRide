const mongoose = require('mongoose');


function connectToDb (){
    // Connect to MongoDB
    console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.MONGODB_URI, )
       .then(() => console.log('Connected to MongoDB'))
       .catch((err) => console.error(`Failed to connect to MongoDB: ${err}`));
}

module.exports = connectToDb;