interface Testimonial {
  name: string;
  review: string;
  rating: number;
  createdAt: Date;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Ali Raza",
    review:
      "Honestly, I wasn’t expecting such fast delivery! Ordered at night and got it the next day. The packaging was neat and everything worked perfectly out of the box. Thumbs up, ShopNex!",
    rating: 5,
    createdAt: new Date("2025-05-20T10:15:00"),
  },
  {
    name: "Sara Ahmed",
    review:
      "ShopNex is my new favorite tech store. The website is smooth, checkout is secure, and their support team actually responds — love it!",
    rating: 5,
    createdAt: new Date("2025-06-10T13:25:00"),
  },
  {
    name: "Ayesha Khan",
    review:
      "I’m not super tech-savvy, but ShopNex made it easy. The product descriptions were clear, and I got exactly what I needed. Thank you!",
    rating: 4,
    createdAt: new Date("2025-05-22T14:45:00"),
  },
  {
    name: "Hamza Sheikh",
    review:
      "From browsing to delivery — the entire process was smooth. I really liked how fast everything was and how easy it was to track my order.",
    rating: 5,
    createdAt: new Date("2025-05-25T09:30:00"),
  },
  {
    name: "Fatima Noor",
    review:
      "Great prices and fast shipping. I reached out for help picking a tablet and got a helpful reply in minutes. Will definitely shop again.",
    rating: 4,
    createdAt: new Date("2025-05-28T16:10:00"),
  },
  {
    name: "Zain Malik",
    review:
      "What stood out for me was the detailed product info and honest pricing. I bought a smartwatch and it came earlier than expected — solid experience overall!",
    rating: 5,
    createdAt: new Date("2025-06-01T11:00:00"),
  },
];

export { testimonialsData };
