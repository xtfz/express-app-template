const colors = require('colors');

const connectMongoDB = async () => {
    if (!process.env.MONGODB_URI) return console.log('[DB]: No MongoDB URI found.'.red);
    mongoose.connect(process.env.MONGODB_URI);
}

module.exports = connectMongoDB;