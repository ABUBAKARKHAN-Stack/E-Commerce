import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { addReviewSchema } from '@/schemas/add-reviewSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {
    productId: string
}

const AddReviewForm: FC<Props> = ({
    productId
}) => {
    const form = useForm({
        resolver: zodResolver(addReviewSchema),
        defaultValues: { review: "", rating: 1 }
    });

    const onSubmit = (data: z.infer<typeof addReviewSchema>) => {
        console.log(data);
    }
    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Write a Review
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Share your experience about this product..."
                                    className="resize-none min-h-[120px]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Give Rating
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='number'
                                    placeholder="Share your experience about this product..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button
                    type="submit"
                    className="w-full sm:w-fit "
                >
                    Submit Review
                </Button>
            </form>
        </Form>

    )
}

export default AddReviewForm