import { JwtPayload } from "jsonwebtoken";


interface JwtUpdtedPayload extends JwtPayload {
    userId?: string;
    email?: string;
}



export {
    JwtUpdtedPayload,
}; 