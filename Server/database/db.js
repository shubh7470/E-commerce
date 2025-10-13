const mongoose = require('mongoose')

const Connection = async () => {
    try{
        const mongoURI = process.env.MONGO_URI;
        
        if (!mongoURI) {
            throw new Error('MONGO_URI environment variable is not set');
        }
        
        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI:', mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in logs
        
        await mongoose.connect(mongoURI)
        console.log("DB Connected Successfully!")
    }catch(error){
        console.log("Error while Connecting Database", error.message)
        console.log("Full error:", error)
        process.exit(1)
    }
}

module.exports = Connection