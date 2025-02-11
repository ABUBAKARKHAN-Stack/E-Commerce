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
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            h1 {
              color: #4CAF50;
              font-size: 28px;
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
              padding: 12px 24px;
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
              width: 100px;
              margin-bottom: 20px;
            }
            .highlight {
              color: #4CAF50;
              font-weight: bold;
            }
            .animation {
              animation: fadeIn 1.5s ease-in-out;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          </style>
        </head>
        <body>
          <div class="container animation">
            <!-- Add your logo here -->
            <img src="https://via.placeholder.com/100" alt="Company Logo" class="logo" />
            
            <h1>${purpose.toLowerCase().includes("email") ? "Email Verification" : "Reset Password"}</h1>
            <p>Hello <span class="highlight">${email}</span>,</p>
            <p>Thank you for registering with us. To complete your ${purpose.toLowerCase().includes("email") ? "email verification" : "password reset"
    }, please click the button below:</p>
            
            <a href="http://localhost:3001/user${purpose.toLowerCase().includes("email") ? `/verify/${email}/${token}` : `/reset-password?email=${email}&token=${token}`}" class="verify-btn">
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