import mongoose from "mongoose";
export const connectDb = async () => {
    try {
        const connectedDb = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected at ${connectedDb.connection.host}`)
    } catch (error) {
        console.log(`Mongodb failed to connect ${error}`);
        process.exit(1);
    }
}