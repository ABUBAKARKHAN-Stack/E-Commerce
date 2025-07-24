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
          text-align: center;
        }
        .logo {
          width: 120px;
          margin-bottom: 20px;
        }
        h1 {
          color: #06b6d4;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
        }
        .highlight {
          font-weight: bold;
          color: #06b6d4;
        }
        .order-box {
          background-color: #ecfeff;
          border: 1px solid #bae6fd;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #777;
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
        <h1>Order Confirmed!</h1>
        <p>Dear <span class="highlight">${customerName}</span>,</p>
        <p>Thank you for shopping with <strong>ShopNex</strong>. Your order has been successfully placed.</p>
        <div class="order-box">
          <p><strong>Order ID:</strong> ${orderId}</p>
        </div>
        <p>You can track your order using the ShopNex website by using your <strong>Order ID: ${orderId}</strong>. Click <a href="http://localhost:5173/track-order?orderId=${orderId}" style="color: #00bcd4; text-decoration: none;">here</a> to track your order.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <div class="footer">
          <p>Best regards,</p>
          <p><strong>ShopNex Team</strong></p>
          <p>Need help? Email us at <a href="mailto:official.shopnex@gmail.com">official.shopnex@gmail.com</a></p>
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