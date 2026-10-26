import mongoose from "mongoose";
import dns from "node:dns";

const connectDB = async () => {
  try {
    // Fix MongoDB Atlas DNS resolution
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    console.log("DNS Servers:", dns.getServers());

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      dbName: "my-proj2DBGeneral",
    });

    console.log(
  "MongoDB URI exists:",
  !!process.env.MONGODB_URI
);

console.log(
  "DNS Servers:",
  dns.getServers()
);
    console.log("MongoDB Connected Successfully");


  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

export default connectDB;