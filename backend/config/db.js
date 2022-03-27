const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Mongo Connected');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;