import { Redis } from "@upstash/redis";
import { env } from "./env";

const redisClient = new Redis({
    url: env.UPSTASH.REDIS_REST_URL,
    token: env.UPSTASH.REDIS_REST_TOKEN
})

export default redisClient;