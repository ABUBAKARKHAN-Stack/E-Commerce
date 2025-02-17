import kafka from "../config/kafka.config";
import { ApiError } from "./ApiError";

const publishEvent = async <Data>(topicName: string, messageKey: string, value: Data) => {
    const producer = kafka.producer()
    try {
        console.log('Connecting to producer...');
        await producer.connect()

        console.log('Sending message to topic...');
        await producer.send({
            topic: topicName,
            messages: [
                {
                    key: messageKey,
                    value: JSON.stringify(value)
                }
            ]
        })
        console.log('Message has been sent to Kafka topic...');
    } catch (error) {
        console.error('Error sending message to Kafka:', error);
        throw new ApiError(500, "Error sending message to Kafka")
    } finally {
        await producer.disconnect()
        console.log('Producer disconnected.');
    }
}

export {
    publishEvent
}