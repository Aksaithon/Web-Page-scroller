import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function getConnection(): Promise<void> {
  try {
    if (connection.isConnected) {
      console.log("already connected to the database");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connected to the database!");
  } catch (error) {}
}

export default getConnection;
