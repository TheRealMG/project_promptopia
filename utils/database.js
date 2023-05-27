import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true); // Enable strict query mode for Mongoose

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); // Connect to the MongoDB database using the provided URI and options

    isConnected = true; // Set the connection status to true

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}