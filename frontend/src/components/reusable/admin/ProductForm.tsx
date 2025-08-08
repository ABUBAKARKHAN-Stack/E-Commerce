import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { productSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productFields } from "@/constants/formFields";
import { Input } from "@/components/ui/input";
import Dropzone from "./Dropzone";
import { useNavigate, useRevalidator } from "react-router-dom";
import { useAdminProductContext } from "@/context/adminProductContext";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AdminProductLoading } from "@/types/main.types";
import { Select } from "@/components/ui/select";
import { categoryOptions } from "@/data/categories";
import { Textarea } from "@/components/ui/textarea";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  thumbnails: string[];
};

type Props = {
  product?: Product;
};

const ProductForm: FC<Props> = ({ product }) => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema.refine((data) => {
      const totalThumbnails = existingThumbnails.length + files.length;
      return totalThumbnails > 0;
    }, {
      message: "At least one thumbnail is required",
      path: ["thumbnails"],
    })),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      quantity: product?.quantity || 0,
      category: product?.category || "",
      thumbnails: [],
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const [existingThumbnails, setExistingThumbnails] = useState<string[]>(
    product?.thumbnails || [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { addProduct, editProduct, removeThumbnail, loading } = useAdminProductContext();
  const { revalidate } = useRevalidator();

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        thumbnails: [],
      });
      setExistingThumbnails(product.thumbnails || []);
      setFiles([]);
    }
  }, [product, form]);

  const resetForm = () => {
    form.reset({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "",
      thumbnails: [],
    });
    setFiles([]);
    setExistingThumbnails([]);
    setSubmitError(null);
  };

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {

      const submissionData = {
        ...data,
        thumbnails: files,
        existingThumbnails: product ? existingThumbnails : [],
      };

      if (product) {
        const res = await editProduct(product._id, submissionData);
        if (!res) return;

        form.reset({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          category: product.category,
          thumbnails: [],
        });
        setFiles([]);
        revalidate()
      } else {
        await addProduct(submissionData);
        resetForm();
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred while saving the product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    if (!isSubmitting) {
      navigate(-1);
    }
  };

  const isLoading =
    isSubmitting ||
    (product && loading === AdminProductLoading.EDIT) ||
    (!product && loading === AdminProductLoading.ADD);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4.5"
      >
        {submitError && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-700 dark:border-red-600 dark:bg-red-900/20 dark:text-red-300">
            <p className="text-sm">{submitError}</p>
          </div>
        )}

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
                    {name === "category" ? (
                      <Select
                        value={form.getValues("category") ?? ""}
                        onChange={(value) => form.setValue("category", value)}
                        options={categoryOptions}
                        disabled={isLoading}
                        placeholder="Select an category..."
                        selectContentColor="scrollbar-thin w-full dark:scrollbar-thumb-orange-500 scrollbar-thumb-cyan-500 scrollbar-track-transparent dark:bg-[#18181b] backdrop-blur-xl shadow-xl bg-[#f8f7f7] max-h-80 overflow-auto max-w-lg !shadow-8px dark:shadow-neutral-900 shadow-neutral-300"
                      />
                    ) : name === "description" ? (
                      <Textarea
                        {...field}
                        disabled={isLoading}
                        placeholder={placeholder}
                      />
                    ) : ((
                      <Input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        disabled={isLoading}
                        onChange={(e) => {
                          const value = type === "number" ?
                            (e.target.value === "" ? 0 : Number(e.target.value)) :
                            e.target.value;
                          field.onChange(value);
                        }}
                      />
                    ))}
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

        <div className="flex gap-x-2">
          <Button
            disabled={isLoading}
            className="xsm:w-fit w-full"
            type="submit"
          >
            {isLoading && <Loader2 className="animate-spin-faster" />}
            {product ? "Edit Product" : "Add Product"}
          </Button>
          <Button
            onClick={handleGoBack}
            className="xsm:w-fit w-full"
            type="button"
            variant="outline"
            disabled={isLoading}
            aria-label="Go back to previous page"
          >
            <ArrowLeft />
            Go Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;