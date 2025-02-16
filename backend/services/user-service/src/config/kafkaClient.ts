import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "e-com/users",
    brokers: ["localhost:9092"],
});