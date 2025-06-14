import { Kafka } from 'kafkajs'
 
// Create the client with the broker list
const kafka = new Kafka({
  clientId: 'product-service',
  brokers: ['192.168.0.102:9092']
})

export default kafka;  