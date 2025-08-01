import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import { connectDb } from './config/connectDb';
import cookieparser from 'cookie-parser'
import { env } from './config/env';
import { consumeCheckoutEvent } from './utils/kafka';
const app = express();

import { stripeWebhookHandler } from './controllers/order.controller';

app.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

app.use(json({
    limit: '50mb'
}));
app.use(urlencoded({
    extended: true
}));

app.use(cookieparser())

//* Order Routes
import orderRoutes from './routes/order.routes'; //* For USERS
import adminOrderRoutes from './routes/admin.order.routes' //* For Admin
app.use('/', orderRoutes);
app.use('/admin', adminOrderRoutes)


const PORT = env.PORT || 3001;

Promise.all([
    consumeCheckoutEvent()
])
    .then(() => {
        console.log("Connected to Kafka");
    })
    .catch((error) => {
        console.log("Error connecting to Kafka :: ", error);
    })

import errorHandler from './middlewares/errorHandler.middleware';

app.use(errorHandler);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Order service is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error connecting to order database :: ", error);
    })

