import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import { connectDb } from './config/connectDb';
import cookieparser from 'cookie-parser'
import { env } from './config/env';
import { consumeCartEvent } from './utils';
const app = express();
app.use(json({
    limit: '50mb'
}));
app.use(urlencoded({
    extended: true
}));
 
app.use(cookieparser())

import orderRoutes from './routes/order.routes';
app.use('/', orderRoutes);


const PORT = env.PORT || 3001;

Promise.all([
    consumeCartEvent()
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
            console.log(`User service is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error connecting to user database :: ", error);
    })

