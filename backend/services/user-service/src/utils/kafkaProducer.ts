import { kafka } from '../config/kafkaClient'

async function sendToken(topic: string, message: any) {
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [
            { value: JSON.stringify(message) }
         ]
    })
    await producer.disconnect()
} 