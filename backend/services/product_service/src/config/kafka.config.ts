import { Kafka } from 'kafkajs'
 
const kafka = new Kafka({
  clientId: 'product-service',
  brokers: ['localhost:9092']
})

export default kafka;  