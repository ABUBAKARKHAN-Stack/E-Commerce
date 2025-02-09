import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import { connectDb } from './config/connectDb';
import cookieparser from 'cookie-parser'

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

app.use("/user", router);

const PORT = process.env.PORT || 3001;

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`User service is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Error connecting to user database :: ", error);
    })

