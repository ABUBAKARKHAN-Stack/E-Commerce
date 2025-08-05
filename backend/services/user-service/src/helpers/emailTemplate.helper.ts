const emailAuthTemplate = (purpose: string, email: string, token?: string) => {
  const isEmailVerification = purpose.toLowerCase().includes("email");
  const actionText = isEmailVerification ? "Verify Email" : "Reset Password";
  const actionPath = isEmailVerification
    ? `/verify/${email}/${token}`
    : `/reset-password?email=${email}&token=${token}`;

  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f0fafd;
            margin: 0;
            padding: 0;
            color: #222;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
            text-align: center;
          }
          h1 {
            color: #00bcd4;
            font-size: 30px;
            margin-bottom: 20px;
            font-weight: 700;
          }
          p {
            font-size: 16px;
            line-height: 1.7;
            color: #444;
            margin-bottom: 20px;
          }
          .btn {
            display: inline-block;
            padding: 14px 28px;
            background-color: #00bcd4;
            color: #ffffff !important;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 8px;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .btn:hover {
            background-color: #0097a7;
            transform: translateY(-2px);
          }
          .footer {
            margin-top: 40px;
            font-size: 13px;
            color: #888;
          }
          .logo {
            width: 120px;
            margin-bottom: 25px;
          }
          .highlight {
            color: #00bcd4;
            font-weight: 600;
          }

          @media (prefers-color-scheme: dark) {
            body {
              background-color: #121212;
              color: #e0e0e0;
            }
            .container {
              background-color: #1e1e1e;
              box-shadow: 0 8px 20px rgba(255, 152, 0, 0.2);
            }
            h1 {
              color: #ff9800;
            }
            .btn {
              background-color: #ff9800;
              color: #1e1e1e !important;
            }
            .btn:hover {
              background-color: #fb8c00;
            }
            .highlight {
              color: #ff9800;
            }
            .footer {
              color: #aaa;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="https://placehold.co/120x40?text=ShopNex" alt="ShopNex Logo" class="logo" />

          <h1>${isEmailVerification ? "Email Verification" : "Reset Password"}</h1>
          <p>Hello <span class="highlight">${email}</span>,</p>
          <p>To complete your ${isEmailVerification ? "email verification" : "password reset"} process, please click the button below:</p>

          <a href="http://localhost:5173/user${actionPath}" class="btn">${actionText}</a>

          <p>If you did not request this, you can safely ignore this email.</p>

          <div class="footer">
            <p>Thank you for choosing <strong>ShopNex</strong>.</p>
            <p>Need help? <a href="mailto:support@shopnex.com" style="color: inherit; text-decoration: underline;">support@shopnex.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const orderConfirmationTemplate = (
  customerName: string,
  orderId: string,
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - ShopNex</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 20px 0;
          color: #334155;
          line-height: 1.6;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        
        .header {
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
          padding: 40px 40px 30px;
          text-align: center;
          color: white;
        }
        
        .logo {
          width: 160px;
          height: auto;
          margin-bottom: 20px;
          filter: invert(1);
        }
        
        .header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        
        .header p {
          font-size: 16px;
          opacity: 0.9;
          margin: 0;
        }
        
        .content {
          padding: 40px;
        }
        
        .greeting {
          font-size: 18px;
          margin-bottom: 24px;
          color: #1e293b;
        }
        
        .customer-name {
          font-weight: 600;
          color: #0ea5e9;
        }
        
        .message {
          font-size: 16px;
          margin-bottom: 32px;
          color: #475569;
        }
        
        .order-details {
          background: linear-gradient(135deg, #f1f9ff 0%, #e0f2fe 100%);
          border: 2px solid #bae6fd;
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          text-align: center;
        }
        
        .order-details h3 {
          color: #0c4a6e;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .order-id {
          font-size: 20px;
          font-weight: 700;
          color: #0ea5e9;
          font-family: 'Courier New', monospace;
          background-color: #ffffff;
          padding: 12px 20px;
          border-radius: 8px;
          display: inline-block;
          border: 1px solid #e2e8f0;
        }
        
        .tracking-section {
          background-color: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          text-align: center;
        }
        
        .tracking-section h3 {
          color: #1e293b;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .track-button {
          display: inline-block;
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
          color: white;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }
        
        .track-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(14, 165, 233, 0.4);
        }
        
        .support-section {
          margin-top: 40px;
          padding-top: 32px;
          border-top: 1px solid #e2e8f0;
        }
        
        .support-text {
          font-size: 15px;
          color: #64748b;
          margin-bottom: 20px;
        }
        
        .footer {
          background-color: #f8fafc;
          padding: 32px 40px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
        }
        
        .footer-brand {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }
        
        .footer-text {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 16px;
        }
        
        .contact-info {
          font-size: 14px;
          color: #64748b;
        }
        
        .contact-info a {
          color: #0ea5e9;
          text-decoration: none;
          font-weight: 500;
        }
        
        .contact-info a:hover {
          text-decoration: underline;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
          margin: 24px 0;
        }
        
        @media (max-width: 640px) {
          body {
            padding: 10px 0;
          }
          
          .header, .content, .footer {
            padding: 24px 20px;
          }
          
          .header h1 {
            font-size: 28px;
          }
          
          .order-id {
            font-size: 18px;
            padding: 10px 16px;
          }
          
          .track-button {
            padding: 12px 24px;
            font-size: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/ddlrtyx9h/image/upload/v1753896009/shopnex_iuy8nb.webp" alt="ShopNex Logo" class="logo" />
          <h1>Order Confirmed</h1>
          <p>Your order has been successfully processed</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Dear <span class="customer-name">${customerName}</span>,
          </div>
          
          <div class="message">
            Thank you for choosing <strong>ShopNex</strong>. We're pleased to confirm that your order has been successfully placed and is now being processed by our fulfillment team.
          </div>
          
          <div class="order-details">
            <h3>Order Confirmation</h3>
            <div class="order-id">${orderId}</div>
          </div>
          
          <div class="tracking-section">
            <h3>Track Your Order</h3>
            <p style="margin-bottom: 20px; color: #64748b;">You can monitor your order status in real-time using your Order ID.</p>
            <a href="http://localhost:5173/track-order?orderId=${orderId}" class="track-button" style="color:white;">Track Order Status</a>
          </div>
          
          <div class="divider"></div>
          
          <div class="support-section">
            <div class="support-text">
              <strong>What's Next?</strong><br>
              • You'll receive a shipping confirmation email once your order is dispatched<br>
              • Estimated delivery time will be provided with tracking information<br>
              • Keep your Order ID handy for any future inquiries
            </div>
            
            <div class="support-text">
              If you have any questions about your order or need assistance, our customer support team is here to help.
            </div>
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-brand">ShopNex</div>
          <div class="footer-text">Thank you for your business. We appreciate your trust in us.</div>
          <div class="contact-info">
            Questions? Contact us at <a href="mailto:official.shopnex@gmail.com">official.shopnex@gmail.com</a>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};

 const contactMessageTemplate = (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4faff;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 30px auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .logo {
          width: 120px;
          margin-bottom: 20px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        h1 {
          color: #06b6d4;
          font-size: 26px;
          text-align: center;
          margin-bottom: 24px;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #444;
        }
        .info-box {
          background-color: #ecfeff;
          border: 1px solid #bae6fd;
          border-radius: 10px;
          padding: 20px;
          margin-top: 20px;
        }
        .info-item {
          margin-bottom: 12px;
        }
        .label {
          font-weight: bold;
          color: #0ea5e9;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #777;
          text-align: center;
        }
        .footer a {
          color: #06b6d4;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="https://placehold.co/600x400?text=ShopNex+Logo" alt="ShopNex Logo" class="logo" />
        <h1>New Contact Form Message</h1>
        <p>You’ve received a new message from the <strong>ShopNex Contact Form</strong>.</p>
        
        <div class="info-box">
          <div class="info-item">
            <span class="label">Name:</span> ${name}
          </div>
          <div class="info-item">
            <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
          </div>
          <div class="info-item">
            <span class="label">Subject:</span> ${subject || 'N/A'}
          </div>
          <div class="info-item">
            <span class="label">Message:</span>
            <p style="margin-top: 8px;">${message}</p>
          </div>
        </div>

        <div class="footer">
          <p>This message was sent from the ShopNex contact form.</p>
          <p><a href="mailto:official.shopnex@gmail.com">official.shopnex@gmail.com</a></p>
        </div>
      </div>
    </body>
  </html>
  `;
};



export {
  emailAuthTemplate,
  orderConfirmationTemplate,
  contactMessageTemplate
}