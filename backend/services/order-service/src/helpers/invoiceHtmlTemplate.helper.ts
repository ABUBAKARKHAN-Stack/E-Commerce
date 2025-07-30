import { IShippingAddress, PaymentMethod } from "../types/main.types";

const getInvoiceHtmlTemplate = ({
    shipping,
    shippingMethod,
    shippingAddress,
    paymentStatus,
    paymentMethod,
    refund,
    status,
    isDelivered,
    confirmedAt,
    createdAt,
    orderId,
    products,
    totalAmount
}: {
    products: { name: string; orderedProductQuantity: number; price: number }[];
    orderId: string;
    totalAmount: number;
    confirmedAt: Date | null;
    status: string;
    shippingAddress: IShippingAddress | null;
    shippingMethod: string | null;
    shipping: number | null;
    paymentStatus: string;
    refund: {
        refundAmount?: number;
        refundAt?: Date | string | null;
        stripeRefundId?: string | null;
    } | null;
    paymentMethod: string | null;
    isDelivered: boolean;
    createdAt: Date;
}) => {
    const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

    const safeShipping = shipping ?? 0;
    const safeShippingMethod = shippingMethod ?? "N/A";
    const safePaymentMethod = paymentMethod
        ? paymentMethod === PaymentMethod.COD
            ? "Cash On Delivery"
            : paymentMethod === PaymentMethod.STRIPE
                ? "Card Payment"
                : paymentMethod
        : "N/A";

    const safeAddress = shippingAddress ?? {
        fullName: "N/A",
        email: "N/A",
        phone: "N/A",
        addressLine1: "N/A",
        addressLine2: "",
        city: "N/A",
        state: "N/A",
        country: "N/A",
        postalCode: "N/A"
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Slip - ShopNex</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body { margin: 0; padding: 0; font-size: 12px; }
      .no-print { display: none; }
      .print-container { box-shadow: none !important; margin: 0; }
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-900 p-2">
  <div class="print-container max-w-4xl mx-auto bg-white shadow border border-gray-200 text-sm leading-tight">
    
    <!-- Download Button -->
    <div class="no-print p-3 bg-gray-50 border-b border-gray-200">
      <button onclick="window.print()" class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded text-sm">
        📄 Download Order Slip
      </button>
    </div>

    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-3">
          <img src="https://res.cloudinary.com/ddlrtyx9h/image/upload/v1753896009/shopnex_iuy8nb.webp" width="200" />
        </div>
        <div class="text-right">
          <h2 class="text-xl font-bold text-orange-600 mb-1">ORDER SLIP</h2>
          <p><strong>Date:</strong> ${new Date(createdAt).toLocaleDateString()}</p>
          <p><strong>Order #:</strong> ${orderId}</p>
          <p><strong>Status:</strong> <span class="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">${status}</span></p>
        </div>
      </div>
    </div>

    <!-- Main -->
    <div class="p-4 space-y-4">

      <!-- Customer & Shipping -->
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-4 rounded border">
          <h3 class="font-semibold mb-2">CUSTOMER INFO</h3>
          <p><strong>Name:</strong> ${safeAddress.fullName}</p>
          <p><strong>Email:</strong> ${safeAddress.email}</p>
          <p><strong>Phone:</strong> ${safeAddress.phone}</p>
        </div>
       <div class="bg-gray-50 p-4 rounded border">
       <h3 class="font-semibold mb-2">SHIPPING ADDRESS</h3>
       <p><strong>Address Line 1:</strong> ${safeAddress.addressLine1}</p>
        ${safeAddress.addressLine2 ? `<p><strong>Address Line 2:</strong> ${safeAddress.addressLine2}</p>` : ''}
       <p><strong>City/State:</strong> ${safeAddress.city}, ${safeAddress.state}</p>
       <p><strong>Country / Postal:</strong> ${safeAddress.country} - ${safeAddress.postalCode}</p>
       <p class="mt-2"><strong>Method:</strong> ${safeShippingMethod}</p>
    </div>

      </div>

      <!-- Order Items -->
      <div>
        <h3 class="font-semibold mb-2">ORDER DETAILS</h3>
        <table class="w-full border text-xs">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="text-left p-2">ITEM</th>
              <th class="text-center p-2">QTY</th>
              <th class="text-right p-2">UNIT</th>
              <th class="text-right p-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(({ name, price, orderedProductQuantity }, index) => `
              <tr class="${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b">
                <td class="p-2">${name}</td>
                <td class="p-2 text-center">${orderedProductQuantity}</td>
                <td class="p-2 text-right">${formatCurrency(price)}</td>
                <td class="p-2 text-right font-semibold">${formatCurrency(price * orderedProductQuantity)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Summary & Payment -->
      <div class="grid md:grid-cols-2 gap-4">
        <div></div> <!-- empty left -->
        <div class="bg-gray-50 p-4 rounded border">
          <h3 class="font-semibold mb-2">PAYMENT SUMMARY</h3>
          <div class="flex justify-between"><span>Subtotal:</span><span>${formatCurrency(totalAmount - safeShipping)}</span></div>
          <div class="flex justify-between"><span>Shipping:</span><span>${formatCurrency(safeShipping)}</span></div>
          <hr class="my-1 border-gray-300">
          <div class="flex justify-between font-bold text-sm"><span>Total:</span><span class="text-orange-600">${formatCurrency(totalAmount)}</span></div>

          <div class="mt-2 text-xs">
            <p><strong>Method:</strong> ${safePaymentMethod}</p>
            <p><strong>Status:</strong> <span class="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">${paymentStatus}</span></p>
            ${refund?.refundAmount && refund?.refundAt ? `
              <div class="mt-2 bg-yellow-50 border border-yellow-200 p-2 rounded text-xxs">
                <p><strong>Refund:</strong> ${formatCurrency(refund.refundAmount)}</p>
                <p>Date: ${new Date(refund.refundAt).toLocaleDateString()}</p>
                <p>ID: ${refund.stripeRefundId ?? 'N/A'}</p>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="bg-gray-50 p-4 rounded border">
        <h3 class="font-semibold mb-2">ORDER TIMELINE</h3>
        <div class="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p><strong>Placed:</strong></p>
            <p>${new Date(createdAt).toLocaleString()}</p>
          </div>
          ${confirmedAt ? `
            <div>
              <p><strong>Confirmed:</strong></p>
              <p>${new Date(confirmedAt).toLocaleString()}</p>
            </div>
          ` : ''}
          <div>
            <p><strong>Delivered:</strong></p>
            <p>${isDelivered ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-gray-100 border-t p-3 text-center text-xs text-gray-600">
      <p class="font-semibold text-orange-500">Thank you for your purchase!</p>
      <p>If you have any issues, contact support.</p>
      <p class="mt-1 text-xxs">&copy; ${new Date().getFullYear()} <span class="text-orange-500 font-semibold">ShopNex</span>. Generated ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
`;
};

export { getInvoiceHtmlTemplate };
