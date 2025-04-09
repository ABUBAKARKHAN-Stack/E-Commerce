import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "user-service",
    brokers: ["192.168.0.106:9092"],
}); 