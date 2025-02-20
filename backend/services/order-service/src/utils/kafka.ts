import { kafka } from '../config/kafka.config'
import { createOrder } from '../helpers/order.helper';


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

const consumeCartEvent = async () => {
    const consumer = kafka.consumer({ groupId: 'order-service-group' });
    try {
        console.log('Connecting to consumer...');
        await consumer.connect();
        console.log('Subscribing to topic...');
        await consumer.subscribe({ topics: ["cart-checkout"], fromBeginning: false });
        console.log('Waiting for messages...');
        await consumer.run({
            eachMessage: async ({ topic, message }) => {
                const data = JSON.parse(message.value?.toString() || '{}');
                console.log('Received message from Kafka topic...');
                await createOrder(data);
            }
        })
    } catch (error) {
        console.log("Error while consuming event :: ", error)
    }
}


export {
    publishEvent,
    consumeCartEvent
}