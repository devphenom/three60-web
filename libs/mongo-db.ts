// import { MongoClient } from "mongodb";
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri: string = process.env.MONGODB_URI;
const clientPromise = async () => mongoose.connect(uri);

export default clientPromise;
// export default clientPromise;
