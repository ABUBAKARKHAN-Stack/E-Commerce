import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URI!);
        const { host, port , name } = connectionInstance.connection;
        console.log(`Connected to database at ${host}:${port}/${name}`);
    } catch (error) {
        console.log("Error Database Connection :: ", error);
    }

}
export { connectDb };