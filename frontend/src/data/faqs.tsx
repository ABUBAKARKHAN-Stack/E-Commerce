import { Link } from "react-router-dom";

const commonFaqs = [
    {
        id: 1,
        question: "What is the estimated delivery time?",
        answer: "Your order will be delivered within 2 business days from the date of confirmation.",
    },
    {
        id: 2,
        question: "How can I track my order?",
        answer: (
            <>
                Simply enter your Order ID on the{" "}
                <Link to="/track-order" className="underline font-medium text-white dark:hover:text-orange-200 hover:text-cyan-100">
                    Track Order
                </Link>{" "}
                page to get real-time delivery updates.
            </>
        ),
    },
    {
        id: 3,
        question: "Where can I find my Order ID?",
        answer: (
            <>
                Once your order is confirmed, you will receive an email containing your Order ID, along with a{" "}
                <Link to="/track-order" className="underline font-medium text-white dark:hover:text-orange-200 hover:text-cyan-100">
                    quick link to track your order
                </Link>
                .
            </>
        ),
    },
    {
        id: 5,
        question: "Is shipping free on all orders?",
        answer: "Shipping isn't free — a flat $50 shipping fee applies to all orders, no matter the total amount.",
    },
];

const detailedFaqs = [
    ...commonFaqs,
    {
        id: 4,
        question: "What if I didn’t receive a confirmation email?",
        answer: (
            <>
                Please check your spam or promotions folder. If you still can't find it, contact our support at{" "}
                <a href="mailto:official.shopnex@gmail.com" className="underline font-medium text-white dark:hover:text-orange-200 hover:text-cyan-100">
                    official.shopnex@gmail.com
                </a>
                .
            </>
        ),
    },
    {
        id: 6,
        question: "Can I cancel my order after confirmation?",
        answer: "Orders can be canceled within 1 hour of confirmation. After that, cancellation may not be possible as the order might already be processed.",
    },
    {
        id: 7,
        question: "What payment methods do you accept?",
        answer: "We accept all major debit/credit cards, Stripe, and secure wallet payments.",
    },
    {
        id: 8,
        question: "Is my payment information secure?",
        answer: "Absolutely. We use industry-standard SSL encryption and Stripe to ensure all transactions are 100% secure.",
    },
    {
        id: 9,
        question: "Do you deliver to all cities in Pakistan?",
        answer: "Yes, we offer nationwide delivery across Pakistan.",
    },
    {
        id: 10,
        question: "Can I change my delivery address after placing an order?",
        answer: "You can request a delivery address change within 30 minutes of placing your order by contacting our support.",
    },
];

export { commonFaqs, detailedFaqs };
