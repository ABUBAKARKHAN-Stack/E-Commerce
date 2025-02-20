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

const subscribeToTopics = async (topics: string[], messageHandler: (message: any) => void) => {
    const consumer = kafka.consumer({ groupId: 'productss-service-group' });

    try {
        console.log('🚀 Connecting to consumer...');
        await consumer.connect();
        console.log('🔔 Subscribing to topics:', topics);
        await consumer.subscribe({ topics, fromBeginning: false });

        console.log('📥 Waiting for messages...');
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`🔥 Processing Kafka message from topic: ${topic}`);
                console.log("📌 Key:", message.key?.toString());
                console.log("📩 Raw Message:", message.value?.toString());
               
                try {
                    const parsedMessage = JSON.parse(message.value!.toString());
                    messageHandler(parsedMessage);
                    console.log("✅ Received message:", parsedMessage);
                } catch (error) {
                    console.error("❌ Error parsing message:", error);
                }
            },
        });

        // Keep the process alive
        process.on('SIGINT', async () => {
            console.log('🛑 Shutting down consumer...');
            await consumer.disconnect();
            process.exit();
        });

    } catch (error) {
        console.error('❌ Error subscribing to Kafka topics:', error);
        throw new ApiError(500, "Error subscribing to Kafka topics");
    }
};

export {
    publishEvent,
    subscribeToTopics
}