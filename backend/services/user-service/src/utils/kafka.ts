import { kafka } from '../config/kafka.config'
import { handleCartCreation, } from '../helpers/cart.helper'

const publishEvent = async<Data>(topicName: string, messageKey: string, value: Data) => {
    const producer = kafka.producer();
    try {
        console.log('Connecting to producer...');

        await producer.connect();

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
        console.log("Error while publishing event :: ", error)
    } finally {
        await producer.disconnect();
    }
}


const cartEventConsumer = async () => {
    const consumer = kafka.consumer({ groupId: "cart-service-group" });
    console.log('Connecting to consumer...');
    await consumer.connect();
    console.log('Subscribing to topic...');
    await consumer.subscribe({
        topics: ["cart-creation", "cart-update", "product-removal"],
        fromBeginning: false,  // Modify as necessary
    });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            try {
                const messageKey = message.key?.toString();
                const messageValue = message.value ? JSON.parse(message.value.toString()) : null;

                if (!messageValue) {
                    console.log("Invalid message value received");
                    return;
                }
                const { userId, product } = messageValue;
                console.log(messageKey);
                switch (messageKey) {
                    case "created_cart":
                        await handleCartCreation({ userId, product });
                        break;
                    case "updated_cart":
                        await handleCartCreation({ userId, product });
                        break;
                    default:
                        console.log("Invalid message key");
                        break;
                }
            } catch (error) {
                console.log("Error while consuming event :: ", error);
            }
        },
    });
};




export {
    publishEvent,
    cartEventConsumer
}