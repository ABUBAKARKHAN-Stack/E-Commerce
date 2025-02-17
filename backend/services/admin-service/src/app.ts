import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import { connectDb } from './config/connectDb';
import cookieparser from 'cookie-parser'
import { env } from './config/env';
import { productEventsConsumer } from './utils/kafka';

const app = express();
app.use(json({
    limit: '50mb'
}));
app.use(urlencoded({
    extended: true
}));

app.use(cookieparser())

// Importing routes
import router from './routes/admin.routes';
import errorHandler from './middlewares/errorHandler.middleware';

app.use("/", router);

productEventsConsumer()
    .then(() => {
        console.log("Kafka consumer started successfully");
    })
    .catch((error) => {
        console.log("Error starting Kafka consumer :: ", error);
    })
    
const PORT = env.PORT || 3002;

app.use(errorHandler);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Admin service is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error connecting to Admin database :: ", error);
    })

