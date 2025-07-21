import { z } from "zod";

const addReviewSchema = z.object({
    rating: z.coerce.number({
        required_error: "Please give a rating.",
        invalid_type_error: "Rating must be a number between 1 and 5.",
    })
        .min(1, { message: "Minimum rating is 1 star." })
        .max(5, { message: "Maximum rating is 5 stars." }),

    review: z.string({
        required_error: "Please write a review.",
        invalid_type_error: "Your review must be text.",
    })
        .min(20, {
            message: "Your review is too short. Please write at least 20 characters to help others.",
        })
        .max(300, {
            message: "Your review is too long. Please keep it under 300 characters to stay concise.",
        })
});


export {
    addReviewSchema
}