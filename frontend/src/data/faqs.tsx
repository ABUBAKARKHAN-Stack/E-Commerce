import { Link } from "react-router-dom";

const commonFaqs = [
  {
    id: 1,
    question: "What is the estimated delivery time?",
    answer:
      "Your order will be delivered within 2 business days from the date of confirmation.",
  },
  {
    id: 2,
    question: "How can I track my order?",
    answer: (
      <>
        Simply enter your Order ID on the{" "}
        <Link
          to="/track-order"
          target="_blank"
          className="font-medium text-white underline hover:text-cyan-100 dark:hover:text-orange-200"
        >
          Track Order
        </Link>{" "}
        page to get real-time delivery updates.
      </>
    ),
  },
  {
    id: 3,
    question: "Where can I find all my orders?",
    answer: (
      <>
        You can view all your orders by visiting the{" "}
        <Link
          to="/orders"
          target="_blank"
          className="font-medium text-white underline hover:text-cyan-100 dark:hover:text-orange-200"
        >
          Orders
        </Link>{" "}
        section in your dashboard. There, you'll find a complete list of your
        orders along with their Order IDs and basic details.
      </>
    ),
  },
  {
    id: 4,
    question: "Where can I find my Order ID?",
    answer: (
      <>
        Once your order is confirmed, you will receive an email containing your
        Order ID, along with a{" "}
        <Link
          to="/track-order"
          target="_blank"
          className="font-medium text-white underline hover:text-cyan-100 dark:hover:text-orange-200"
        >
          quick link to track your order
        </Link>
        . You can also find the Order ID in the{" "}
        <Link
          to="/orders"
          target="_blank"
          className="font-medium text-white underline hover:text-cyan-100 dark:hover:text-orange-200"
        >
          Orders
        </Link>{" "}
        section of your dashboard.
      </>
    ),
  },
  {
    id: 5,
    question: "Is shipping free on all orders?",
    answer:
      "Yes, shipping is free for orders above $1000. For orders under $1000, standard shipping costs $6.99 and express shipping costs $9.99.",
  },
];

const detailedFaqs = [
  ...commonFaqs,
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept two payment methods: Cash on Delivery and secure online card payments via Stripe.",
  },
  {
    id: 7,
    question: "What if I didn’t receive a confirmation email?",
    answer: (
      <>
        Please check your spam or promotions folder. If you still can't find it,
        contact our support at{" "}
        <a
          href="mailto:official.shopnex@gmail.com"
          className="font-medium text-white underline hover:text-cyan-100 dark:hover:text-orange-200"
        >
          official.shopnex@gmail.com
        </a>
        .
      </>
    ),
  },
  {
    id: 8,
    question: "How can I cancel my order?",
    answer: (
      <>
        Go to your{" "}
        <Link
          to="/orders"
          target="_blank"
          className="font-medium text-white underline hover:text-cyan-100 dark:hover:text-orange-200"
        >
          Orders
        </Link>{" "}
        page, then select the specific order you wish to cancel and click{" "}
        <strong>“View Full Details”</strong>. If the order is still eligible
        based on its status, you'll see the <strong>“Cancel Order”</strong>{" "}
        button.
        <br />
        <br />
        <span className="font-medium">Note:</span> Orders can only be canceled
        within 1 hour of placement or confirmation.
      </>
    ),
  },
  {
    id: 9,
    question: "Can I download my order invoice slip?",
    answer: (
      <>
        Yes! Go to your{" "}
        <Link
          to="/orders"
          target="_blank"
          className="font-medium text-white underline hover:text-cyan-100 dark:hover:text-orange-200"
        >
          Orders
        </Link>{" "}
        page, then select the specific order and click{" "}
        <strong>“View Full Details”</strong>. If your order is eligible, you'll
        find the <strong>“Download Invoice”</strong> button there.
        <br />
        <br />
        <span className="font-medium">Note:</span> Invoice download is disabled
        for orders that are still in <strong>Pending</strong> status.
      </>
    ),
  },
  {
    id: 10,
    question: "Do you deliver to all cities in Pakistan?",
    answer: "Yes, we offer nationwide delivery across Pakistan.",
  },
  {
    id: 11,
    question: "Can I change my delivery address after placing an order?",
    answer:
      "You can request a delivery address change within 30 minutes of placing your order by contacting our support.",
  },
  {
    id: 12,
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard SSL encryption and Stripe to ensure all transactions are 100% secure.",
  },
];

export { commonFaqs, detailedFaqs };
