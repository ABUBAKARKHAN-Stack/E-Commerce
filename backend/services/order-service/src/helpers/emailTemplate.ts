interface EmailTemplateData {
    customerName: string;
    orderId: string;
    deliveryDate?: string;
    cancellationReason?: string;
}

interface EmailContent {
    subject: string;
    headerTitle: string;
    headerSubtitle: string;
    mainMessage: string;
    actionButton?: {
        text: string;
        url: string;
    };
    additionalSections?: string[];
    footerMessage: string;
    theme?: 'default' | 'cancelled'; // Add theme property
}

const emailConfigs: Record<string, (data: EmailTemplateData) => EmailContent> = {
    orderCancelled: (data) => ({
        subject: `Order Cancelled - ${data.orderId}`,
        headerTitle: "Order Cancelled",
        headerSubtitle: "Your order has been successfully cancelled",
        mainMessage: `We regret to inform you that your <strong>ShopNex</strong> order has been cancelled.${data.cancellationReason ? ` Reason: <strong>${data.cancellationReason}</strong>.` : ""}`,
        actionButton: {
            text: "Browse More Products",
            url: `http://localhost:5173/`
        },
        additionalSections: [
            `<strong>Next Steps:</strong><br>
             • If you were charged, your refund will be processed within 5–7 business days.<br>
             • Please check your bank or card statement to confirm the refund.<br>
             • You can also visit your <a href="http://localhost:5173/orders">Orders</a> page for more details.<br>
             • If you haven't received your refund after 7 business days, please <a href="mailto:official.shopnex@gmail.com">contact us</a> for assistance.<br>`
        ],
        footerMessage: "We're sorry this order didn't work out. We hope to serve you better next time!",
        theme: 'cancelled'
    }),

    orderShipping: (data) => ({
        subject: `Your Order is On Its Way - ${data.orderId}`,
        headerTitle: "Order Shipped",
        headerSubtitle: "Your package is now on its way to you",
        mainMessage: `Great news! Your <strong>ShopNex</strong> order has been shipped and is now on its way to your delivery address.`,
        actionButton: {
            text: "Track Your Package",
            url: `http://localhost:5173/track-order?orderId=${data.orderId}`
        },
        additionalSections: [
            `<strong>Shipping Details:</strong><br>
       • ${data.deliveryDate ? `Expected delivery: <strong>${data.deliveryDate}</strong><br>` : ''}
       • You can track your package in real-time using the button above<br>
       • You'll receive email updates as your package moves<br>
       • Make sure someone is available to receive the package`,
        ].filter(Boolean),
        footerMessage: "We hope you'll love your purchase. Thank you for shopping with us!",
        theme: 'default'
    }),

    orderDelivered: (data) => ({
        subject: `Order Delivered Successfully - ${data.orderId}`,
        headerTitle: "Order Delivered",
        headerSubtitle: "Your package has been successfully delivered",
        mainMessage: `Wonderful! Your <strong>ShopNex</strong> order has been successfully delivered. We hope you're thrilled with your purchase!`,
        actionButton: {
            text: "Leave a Review",
            url: `http://localhost:5173/review-order?orderId=${data.orderId}`
        },
        additionalSections: [
            `<strong>What's Next?</strong><br>
       • Share your experience by leaving a product review<br>
       • Keep your order details for warranty purposes<br>
       • Follow us on social media for exclusive deals<br>
      `,
            `<strong>Need Help?</strong><br>
       If you have any issues with your order, please don't hesitate to contact our customer support team within 7 days of delivery.`
        ],
        footerMessage: "Thank you for choosing ShopNex. We look forward to serving you again!",
        theme: 'default'
    })
};

//* Base email template generator
const generateEmailTemplate = (
    templateType: keyof typeof emailConfigs,
    data: EmailTemplateData
): string => {
    const config = emailConfigs[templateType];
    if (!config) {
        throw new Error(`Email template type "${templateType}" not found`);
    }

    const content = config(data);
    const isCancelled = content.theme === 'cancelled';

    return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${content.subject} - ShopNex</title>
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
          background: ${isCancelled ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'};
          padding: 40px 40px 30px;
          text-align: center;
          color: white;
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
          color: ${isCancelled ? '#ef4444' : '#0ea5e9'};
        }
        
        .message {
          font-size: 16px;
          margin-bottom: 32px;
          color: #475569;
        }
        
        .order-details {
          background: ${isCancelled ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' : 'linear-gradient(135deg, #f1f9ff 0%, #e0f2fe 100%)'};
          border: ${isCancelled ? '2px solid #fca5a5' : '2px solid #bae6fd'};
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          text-align: center;
        }
        
        .order-details h3 {
          color: ${isCancelled ? '#7f1d1d' : '#0c4a6e'};
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .order-id {
          font-size: 20px;
          font-weight: 700;
          color: ${isCancelled ? '#ef4444' : '#0ea5e9'};
          font-family: 'Courier New', monospace;
          background-color: #ffffff;
          padding: 12px 20px;
          border-radius: 8px;
          display: inline-block;
          border: 1px solid #e2e8f0;
        }
        
        .action-section {
          background-color: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          text-align: center;
        }
        
        .action-section h3 {
          color: #1e293b;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .action-button {
          display: inline-block;
          background: ${isCancelled ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'};
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
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
          color: ${isCancelled ? '#ef4444' : '#0ea5e9'};
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
          
          .action-button {
            padding: 12px 24px;
            font-size: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <img src="https://res.cloudinary.com/ddlrtyx9h/image/upload/v1753896009/shopnex_iuy8nb.webp" alt="ShopNex Logo" style="width: 160px; height: auto; margin-bottom: 20px; " />
          <h1>${content.headerTitle}</h1>
          <p>${content.headerSubtitle}</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Dear <span class="customer-name">${data.customerName}</span>,
          </div>
          
          <div class="message">
            ${content.mainMessage}
          </div>
          
          <div class="order-details">
            <h3>Order ID</h3>
            <div class="order-id">${data.orderId}</div>
          </div>
          
          ${content.actionButton ? `
          <div class="action-section">
            <h3>${content.actionButton.text.includes('Track') ? 'Track Your Order' : content.actionButton.text.includes('Review') ? 'Share Your Experience' : 'Take Action'}</h3>
            <p style="margin-bottom: 20px; color: #64748b;">
              ${content.actionButton.text.includes('Track') ? 'Monitor your order status in real-time.' :
                content.actionButton.text.includes('Review') ? 'Help other customers by sharing your experience.' :
                    'Click the button below to proceed.'}
            </p>
            <a href="${content.actionButton.url}" style="color: white" class="action-button">${content.actionButton.text}</a>
          </div>
          ` : ''}
          
          ${content.additionalSections && content.additionalSections.length > 0 ? `
          <div class="divider"></div>
          
          <div class="support-section">
            ${content.additionalSections.map(section => `
              <div class="support-text">
                ${section}
              </div>
            `).join('')}
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <div class="footer-brand">ShopNex</div>
          <div class="footer-text">${content.footerMessage}</div>
          <div class="contact-info">
            Questions? Contact us at <a href="mailto:official.shopnex@gmail.com">official.shopnex@gmail.com</a>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
};

const orderCancelledTemplate = (
    customerName: string,
    orderId: string,
    cancellationReason?: string
) => {
    return generateEmailTemplate('orderCancelled', {
        customerName,
        orderId,
        cancellationReason
    });
};


const orderShippingTemplate = (
    customerName: string,
    orderId: string,
    options: {
        deliveryDate?: string;

    } = {}
) => {
    return generateEmailTemplate('orderShipping', {
        customerName,
        orderId,
        ...options
    });
};

const orderDeliveredTemplate = (customerName: string, orderId: string, reviewUrl?: string) => {
    return generateEmailTemplate('orderDelivered', {
        customerName,
        orderId,
    });
};

export {
    generateEmailTemplate,
    orderShippingTemplate,
    orderDeliveredTemplate,
    orderCancelledTemplate,
    type EmailTemplateData,
    type EmailContent
};