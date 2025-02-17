import express from 'express';
import proxy from 'express-http-proxy'
import { env } from './config/env';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json({
    limit: '50mb',
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


//* Routes Gatway Proxy
app.use('/user', proxy(env.USER_SERVICE_URL));

app.use('/admin', proxy(env.ADMIN_SERVICE_URL));
app.use('/product', (req, res, next) => {
    // Check if the request is a file upload
    const isFileUpload = req.headers['content-type']?.includes('multipart/form-data');

    proxy(env.PRODUCT_SERVICE_URL, {
        limit: '50mb',
        parseReqBody: !isFileUpload, // Disable parsing only if it's a file upload
    })(req, res, next);
});

 

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 