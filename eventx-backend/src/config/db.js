import mongoose from 'mongoose';

const connectDB = async (uri) => {
  if (!uri) throw new Error('MONGODB_URI missing');
  
  mongoose.set('strictQuery', true);
  
  const options = {
    serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds instead of 30
    heartbeatFrequencyMS: 2000, // Send a ping every 2 seconds
    retryWrites: true,
    w: 'majority'
  };
  
  await mongoose.connect(uri, options);
  console.log('MongoDB connected successfully');
};

export default connectDB;
