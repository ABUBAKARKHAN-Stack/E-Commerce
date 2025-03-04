import React, { useState } from 'react'
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form';
import { productSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productFields } from '@/constants/formFields';
import { Input } from '../ui/input';
import Dropzone from './Dropzone';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '@/API/adminApi';
import { errorToast, successToast } from '@/utils/toastNotifications';

const ProductForm = () => {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            category: "",
            thumbnails: [],
        }
    })
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()



    const onSubmit = async (data: z.infer<typeof productSchema>) => {

        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price.toString())
        formData.append("quantity", data.quantity.toString())
        formData.append("category", data.category)

        if (Array.isArray(data.thumbnails)) {
            data.thumbnails.forEach((file) => {
                formData.append("thumbnails", file);
            });
        } else {
            console.error("Thumbnails is not an array");
        }


        try {
            setLoading(true)
            const res = await createProduct(formData)
            console.log(res);
            successToast(res.data.message)

        } catch (error: any) {
            console.log(error);
            const errorMsg = error.response.data.message
            errorToast(errorMsg)
        } finally {
            setLoading(false)
        }

        form.reset()

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4.5">
                {
                    productFields
                        .filter((field) => field.name !== "thumbnails")
                        .map(({ name, label, type, placeholder }, i) => (
                            <FormField key={i} control={form.control} name={name} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input {...field} type={type} placeholder={placeholder} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        ))
                }

                <FormField
                    control={form.control}
                    name="thumbnails"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add Thumbnails</FormLabel>
                            <FormControl>
                                <Dropzone form={form} files={files} setFiles={setFiles} field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex gap-x-2'>
                    <Button disabled={loading} className="w-full xsm:w-fit" type="submit">
                        {loading ? "Loading..." : "Add Product"}
                    </Button>
                    <Button onClick={() => navigate(-1)} className="w-full xsm:w-fit" type="button" variant={"outline"}>
                        Go Back
                    </Button>
                </div>
            </form >
        </Form>
    )
}

export default ProductForm