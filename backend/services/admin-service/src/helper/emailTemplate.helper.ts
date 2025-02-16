export const emailTemplate = (purpose: string, email: string, token: string) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            color: #4CAF50;
            font-size: 32px;
            margin-bottom: 20px;
            font-weight: bold;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #555;
          }
          .verify-btn {
            display: inline-block;
            width: 220px;
            margin: 20px auto;
            padding: 15px 30px;
            background-color: #4CAF50;
            color: #ffffff !important;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            border-radius: 8px;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .verify-btn:hover {
            background-color: #45a049;
            transform: translateY(-2px);
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777;
          }
          .logo {
            width: 120px;
            margin-bottom: 20px;
          }
          .highlight {
            color: #4CAF50;
            font-weight: bold;
          }
          .confetti {
            display: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Add your logo here -->
          <img src="https://placehold.co/600x400?text=Hello+World" alt="Company Logo" class="logo" />
          
          <h1>${purpose.toLowerCase().includes("email") ? "Email Verification" : "Reset Password"}</h1>
          <p>Hello <span class="highlight">${email}</span>,</p>
          <p>Thank you for registering with us. To complete your ${purpose.toLowerCase().includes("email") ? "email verification" : "password reset"}, please click the button below:</p>
          
          <a href="http://localhost:3005/admin${purpose.toLowerCase().includes("email") ? `/verify/${email}/${token}` : `/reset-password?email=${email}&token=${token}`}" target="_blank" class="verify-btn">
            ${purpose.toLowerCase().includes("email") ? "Verify Email" : "Reset Password"}
          </a>
          
          <p>If you did not request this, please ignore this email.</p>
          
          <div class="footer">
            <p>Best regards,</p>
            <p><strong>Your Company Name</strong></p>
            <p>Contact us at <a href="mailto:support@yourcompany.com" style="color: #4CAF50; text-decoration: none;">support@yourcompany.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `;
};
