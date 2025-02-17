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

// Importing routes
import router from './routes/user.routes';
import errorHandler from './middlewares/errorHandler.middleware';

app.use("/", router);

const PORT = env.PORT || 3001;

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

