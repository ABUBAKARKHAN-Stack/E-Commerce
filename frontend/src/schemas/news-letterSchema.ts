import { z } from "zod";

const newsLetterSchema = z.object({
  ["news-letter"]: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export { newsLetterSchema };
