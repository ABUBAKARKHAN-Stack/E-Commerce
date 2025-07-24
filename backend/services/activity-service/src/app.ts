import express, { json, urlencoded} from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import { connectDb } from './config/connectDb';


const app = express();

app.use(json({
    limit: "50mb"
}))

app.use(urlencoded({
    extended: true
}))

app.use(cookieParser())

const PORT = env.PORT || 3005;
import activityRoute from './routes/activity.routes'
import errorHandler from './middlewares/errorHandler.middleware';

app.use('/', activityRoute);
 

app.use(errorHandler)

connectDb()
    .then(() => { 
        app.listen(PORT, () => {
            console.log(`Activity service is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error connecting to user database :: ", error);
    })