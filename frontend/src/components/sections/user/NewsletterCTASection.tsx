import { BlurFade } from '@/components/magicui/blur-fade'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { newsLetterSchema } from '@/schemas/news-letterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const NewsletterCTASection = () => {
    const form = useForm({
        resolver: zodResolver(newsLetterSchema),
        defaultValues: {
            "news-letter": ""
        }
    });

    const isSm = useMediaQuery('(max-width: 640px)');
    const onSubmit = (data: z.infer<typeof newsLetterSchema>) => { }

    return (
        <div className='flex sm:flex-row flex-col-reverse justify-between relative gap-x-10 w-full'>
            {/* Newsletter Block */}
            <BlurFade inView direction='right' delay={0.2} once={false}>
                <div className='py-8'>
                    <div className='space-y-2'>
                        <h2 className='text-gray-950 dark:text-white text-center text-lg xsm:text-xl md:text-2xl xl:text-3xl font-bold'>
                            Join the <span className='text-cyan-500 dark:text-orange-500 font-extrabold'>ShopNex</span> Newsletter
                        </h2>
                        <p className='text-xs md:text-sm xl:text-base text-wrap text-center text-gray-900 dark:text-gray-300 mb-6'>
                            Be the first to know about new arrivals, exclusive deals, and insider tech updates.
                        </p>
                    </div>
                    <div className='w-full mt-2'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='z-50'>
                                <div className='relative w-full sm:w-[90%] lg:w-3/4 mx-auto'>
                                    <FormField
                                        control={form.control}
                                        name='news-letter'
                                        render={({ field }) => (
                                            <FormItem className=''>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        placeholder='Enter your email'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className='rounded-l-none rounded-r-md absolute right-[0.5px] top-[0.5px] py-0 sm:px-2 md:px-4 lg:px-8 h-[43px] '>
                                        Subscribe
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </BlurFade>


            {/* Separator */}
            <BlurFade inView delay={0.3} once={false} direction='up'>
                <Separator orientation={isSm ? 'horizontal' : 'vertical'} className='absolute top-1/2 left-[50%] border-l-3 h-full transform dark:border-white border-black opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2' />
            </BlurFade>


            {/* CTA Block */}
            <BlurFade inView direction={isSm ? 'right' : 'left'} delay={0.4} once={false}>
                <div className='py-8'>
                    <div className='space-y-2'>
                        <h2 className='text-gray-950 dark:text-white text-center text-lg xsm:text-xl md:text-2xl xl:text-3xl font-bold'>
                            Ready to Shop with Us?
                        </h2>
                        <p className='text-xs md:text-sm xl:text-base text-wrap text-center text-gray-900 dark:text-gray-300 mb-6'>
                            Discover trending gadgets, top-rated picks, and fresh tech drops waiting for you.
                        </p>
                    </div>
                    <div className='w-full sm:w-[90%] lg:w-3/4 mt-2 mx-auto'>
                        <Button type='button' variant={"default"} className='w-full text-lg font-semibold hover:scale-105 transition-all duration-300 ease-linear rounded-none py-5'>
                            Shop Now
                        </Button>
                    </div>
                </div>
            </BlurFade>
        </div>

    )
}

export default NewsletterCTASection