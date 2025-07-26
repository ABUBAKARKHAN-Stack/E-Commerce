import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "activity-service",
    brokers: ["localhost:9092"],
}); 