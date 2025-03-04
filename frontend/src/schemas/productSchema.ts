import * as z from 'zod'

const productSchema = z.object({
    name: z.string().min(5, {
        message: 'Name must be at least 5 characters long',
    }),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters long',
    }),
    price: z.coerce.number().min(1, {
        message: 'Price must be at least 1',
    }),
    quantity: z.coerce.number().min(1, {
        message: 'Quantity must be at least 1',
    }),
    category: z.string().min(5, {
        message: 'Category must be at least 5 characters long',
    }),
    thumbnails: z.array(z.instanceof(File)).min(1, {
        message: 'Thumbnails must be at least 1',
    }).max(5, {
        message: 'Thumbnails must be at most 5',
    })
})

export default productSchema