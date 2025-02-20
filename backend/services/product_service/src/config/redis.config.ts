import { Redis } from "ioredis";

const redisClient = new Redis()

redisClient.on("connect", () => {
    console.log("Connected to Redis");
})
redisClient.on("error", (err) => {
    console.log("Redis Error", err);
})
export default redisClient;