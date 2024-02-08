
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.mongoURL}`);
        console.log(
            "Database connected to:",
            connect.connection.host,
            connect.connection.name
        );
    } catch (error) {
        console.log("Unable to connect DB, Getting error:", error);
    }
}

export default connectDB;