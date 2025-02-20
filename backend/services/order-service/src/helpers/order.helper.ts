import { v4 as uuidv4 } from "uuid";
import orderModel from "../models/order.model";

const createOrder = async (orderData: any) => {
    try {
        for (const c of orderData) {
            let order = await orderModel.findOne({ user: c.user });

            if (order) {
                if (order.total === c.totalAmount) {
                    console.log("✅ Order already up to date");
                    continue;
                }
                
                order.total = c.totalAmount;
                order.cart.products = c.products;

                try {
                    await order.save();
                    console.log("🔄 Order updated successfully");
                } catch (err) {
                    console.error("❌ Error updating order:", err);
                }
                
                continue;
            }

            const orderId = uuidv4();

            try {
                await orderModel.create({
                    orderId,
                    user: c.user,
                    cart: {
                        _id: c._id,
                        products: c.products
                    },
                    total: c.totalAmount,
                    status: "pending",
                });

                console.log("🆕 New order created successfully");
            } catch (err) {
                console.error("❌ Error creating new order:", err);
            }
        }
    } catch (error) {
        console.error("❌ Unexpected error in createOrder function:", error);
    }
};

export { createOrder };
