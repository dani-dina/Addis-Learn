import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const mongo_URI = process.env.MONGO_URI;

if(!mongo_URI) {
    throw new Error('can not found the mongo uri');
}

const connectDB = () =>{
    try{
        const conn = mongoose.connect(mongo_URI);
        
        console.log('DB connected successfully !');
        return conn;
    }catch(error) {
        console.error('DB can not be connected !!', error);
        process.exit(1);
    }
}

export default connectDB;