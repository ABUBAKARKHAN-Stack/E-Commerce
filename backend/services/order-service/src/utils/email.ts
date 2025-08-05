import nodemailer from 'nodemailer';
import { ApiError } from './ApiError';
import { env } from '../config/env';

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
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
            html: htmlContent,
        });
        console.log(mail.messageId);
    } catch (error: any) {
        console.error('Error sending email:', error.message);
        throw new ApiError(500, 'Error sending email', error.message);
    }
};
