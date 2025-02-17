import { kafka } from '../config/kafka.config'

export const publishEvent = async<Data>(topicName: string, messageKey: string, value: Data) => {
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