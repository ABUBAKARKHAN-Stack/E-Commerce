import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import { connectDb } from './config/connectDb';
import cookieparser from 'cookie-parser'
import { env } from './config/env';

const app = express();
app.use(json({
    limit: '50mb'
}));
app.use(urlencoded({
    extended: true
}));

app.use(cookieparser())

//* Importing  user routes
import userRoutes from './routes/user.routes';
import errorHandler from './middlewares/errorHandler.middleware';
import { cartEventConsumer, orderEventConsumer, wishListEventConsumer } from './utils/kafka';

app.use("/", userRoutes); 

//* Importing  cart routes
import cartRoutes from './routes/cart.routes';
app.use("/", cartRoutes);
Promise.all([
    cartEventConsumer(),
    wishListEventConsumer(),
    orderEventConsumer(),
    
])
    .then(() => {
        console.log("All consumers are running");
    })
    .catch((error) => {
        console.log("Error while running consumers :: ", error);
    })

const PORT = env.PORT ||  3001;

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

