import { adminModel } from "../models/admin.model";
import kafka from "../config/kafka.config";

export const productEventsConsumer = async () => {
    try {
        console.log("Creating a Kafka consumer...");
        const consumer = kafka.consumer({ groupId: "product-service-group" });

        console.log("Connecting Kafka consumer...");
        await consumer.connect();
        console.log("Kafka consumer connected ✅");

        console.log("Subscribing to topics...");
        await consumer.subscribe({ topics: ["product-creation", "product-deletion"], fromBeginning: false });
        console.log("Subscription successful 🎯");

        console.log("Starting Kafka consumer...");
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const product = JSON.parse(message.value!.toString());

                    if (!product && !product._id) {
                        console.error("⚠️ Empty product data received");
                        return;
                    }
                    const messageKey = message.key?.toString();

                    switch (messageKey) {
                        case "created_product":
                            await adminModel.updateOne({},
                                {
                                    $push: {
                                        products: product._id
                                    }
                                }
                            )
                            console.log(`✅ Product ${product._id} added successfully!`);
                            break;

                        case "deleted_product":
                            await adminModel.updateOne({},
                                {
                                    $pull: {
                                        products: product._id
                                    }
                                }
                            )
                            console.log(`✅ Product ${product._id} deleted successfully!`);
                            break;

                        default:
                            console.log(`❌ Unknown message key: ${messageKey}`);
                            break;
                    }
                    console.log("✅ Message processed successfully!");
                } catch (error) {
                    console.error("❌ Error processing message:", error);
                }
            }
        });

        console.log("Kafka consumer is running 🚀");

        // Handle process shutdown
        process.on("SIGINT", async () => {
            console.log("Shutting down Kafka consumer...");
            await consumer.disconnect();
            console.log("Kafka consumer disconnected. ❌");
            process.exit(0);
        });
    } catch (error) {
        console.error("❌ Kafka Consumer Error:", error);
    }
};

