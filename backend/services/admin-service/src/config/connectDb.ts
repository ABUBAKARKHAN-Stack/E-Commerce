import mongoose from "mongoose";
import { env } from "./env";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(env.DB_URI!);
        const { host, port , name } = connectionInstance.connection;
        console.log(`Connected to database at ${host}:${port}/${name}`);
    } catch (error) {
        console.log("Error Database Connection :: ", error);
    } 

}
export { connectDb };  