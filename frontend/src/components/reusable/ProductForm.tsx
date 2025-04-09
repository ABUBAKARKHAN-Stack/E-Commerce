import { FC, useEffect, useState } from 'react';
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { productSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { productFields } from '@/constants/formFields';
import { Input } from '../ui/input';
import Dropzone from './Dropzone';
import { useNavigate } from 'react-router-dom';
import { useAdminProductContext } from '@/context/productContext';

type Props = {
    product?: any;
};

const ProductForm: FC<Props> = ({ product }) => {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name || "",
            description: product?.description || "",
            price: product?.price || 0,
            quantity: product?.quantity || 0,
            category: product?.category || "",
            thumbnails: product?.thumbnails || [],
        },
    });
    const [files, setFiles] = useState<File[]>([]);
    const [existingThumbnails, setExistingThumbnails] = useState<string[]>(product?.thumbnails || []);
    const navigate = useNavigate();
    const { addProduct, addingProduct, editProduct, removeThumbnail } = useAdminProductContext();

    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                category: product.category,
                thumbnails: product.thumbnails || [],
            });
            setExistingThumbnails(product.thumbnails || []);
        }
    }, [product, form]);

    const onSubmit = async (data: z.infer<typeof productSchema>) => {
        const submissionData = {
            ...data,
            thumbnails: files.length > 0 ? files : data.thumbnails,
        };

        if (product) {
            await editProduct(product._id, submissionData);
        } else {
            await addProduct(submissionData);
            form.reset();
            setFiles([]);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4.5">
                {productFields
                    .filter((field) => field.name !== "thumbnails")
                    .map(({ name, label, type, placeholder }, i) => (
                        <FormField
                            key={i}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input {...field} type={type} placeholder={placeholder} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                <FormField
                    control={form.control}
                    name="thumbnails"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add Thumbnails</FormLabel>
                            <FormControl>
                                <Dropzone
                                    setExistingThumbnails={setExistingThumbnails}
                                    existingThumbnails={existingThumbnails}
                                    form={form}
                                    files={files}
                                    setFiles={setFiles}
                                    field={field}
                                    removeThumbnail={removeThumbnail}
                                    product={product}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex gap-x-2'>
                    <Button disabled={addingProduct} className="w-full xsm:w-fit" type="submit">
                        {product ? "Edit Product" : "Add Product"}
                    </Button>
                    <Button onClick={() => navigate(-1)} className="w-full xsm:w-fit" type="button" variant={"outline"}>
                        Go Back
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ProductForm;