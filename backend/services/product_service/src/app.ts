import express, { json, urlencoded } from 'express';
import errorHandler from './middlewares/errorHandler.middleware';
import "dotenv/config";
import { connectDb } from './config/connectDB';
import cookieParser from 'cookie-parser';


const app = express();
app.use(json({
    limit: "50mb",
}));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());


const PORT = process.env.PORT || 3003;

//* Import Routes
import adminProductRoutes from './routes/adminProduct.routes'
import userProductRoutes from './routes/userProduct.routes'
app.use('/admin', adminProductRoutes)
app.use('/', userProductRoutes)

//* Error Handler
app.use(errorHandler);

//* Connect to DB
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to Admin database :: ", error);
    })