import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.D_B, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit the process with a failure code
  }
};


export default connectDB
