import nodemailer from 'nodemailer';
import { ApiError } from './ApiError';

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

export const sendEmail = async (
    from: string,
    to: string,
    subject: string,
    htmlContent: string
) => {
    try {
        const mail = await transport.sendMail({
            from,
            to,
            subject,
            html: htmlContent, // Use HTML content here
        });
        console.log(mail.messageId);
    } catch (error : any) {
        console.error('Error sending email:', error.message);
        throw new ApiError(500, 'Error sending email' , error.message);
    }
};
