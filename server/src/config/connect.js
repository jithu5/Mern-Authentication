import mongoose from 'mongoose';

async function connectDb() {
    try {
        await mongoose.connect('mongodb://localhost/mern-auth');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB')
        process.exit(1);
    }
}

export default connectDb;